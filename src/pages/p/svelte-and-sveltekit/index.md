---
layout: '$lays/BlogLayout.astro'
title: '스벨트 & 스벨트 킷'
description: 'Svelte와 Sveltekit'
publishDate: 2021-12-19T00:34:04+09:00
series: 'Svelte'
tags: ['Frontend', 'Svelte', 'SvelteKit']
---

# 스벨트

## 기본 구조

스벨트 파일는 `.svelte` 확장자를 가집니다. 스벨트 파일에는 scirpt, style, 마크업 이렇게 세 가지 블록이 존재합니다. 이 세 가지 섹션은 필수가 아닌 선택요소입니다.

```svelte
<script>
	// 로직이 위치하는 부분
</script>

<!-- 0개 이상의 마크업 태그가 위치하는 부분 -->

<style>
	/* 스타일이 위치하는 부분 */
</style>
```

### `<script>`

`<script>` 블록은 자바스크립트(혹은 타입스크립트)를 작성하는 부분입니다. 페이지의 로직이 위치하며 일반적으로 최상위에 위치합니다. 스크립트 블록에는 네 가지 규칙이 있습니다.

1. 컴포넌트 prop을 생성하는 export
2. '리액티브'한 할당
3. 리액티브를 위한 `$:` 구문
4. svelte/store를 편하게 사용하기 위한 `$` 접두사

`<script>` 태그에 `context="module"` 속성값이 추가되면 처음 한 번만 실행됩니다.

### `<style>`

`style` 블록은 스타일을 작성하는 부분입니다. 스타일을 전역으로 적용하고 싶다면 `:global(...)` 수정자를 사용합니다. 만약 키프레임을 전역으로 적용하고 싶다면 이름 앞에 `-global-`을 붙여줍니다. `<style>` 블록은 문서에 한 개의 블록만 존재해야 합니다. 마크업 태그 안에는 존재할 수 있지만, 스벨트에서 지원하는 전역 스타일 같은 기능이 지원되지 않고 일반 HTML 문서와 같이 처리됩니다.

```svelte
<style>
    /* 버튼 스타일 예시 */
    button {
        background-color: gray;
    }

    /* 버튼 전역 스타일 예시 */
    :global(button) {
        color: white;
    }

    /* 키프레임 전역 예시 */
    @keyframes -global-my-animation-name {...}
</style>
```

## 변수

### 기본적인 선언 및 사용

```svelte {linenos=inline,hl_lines=[2,6]}
<script>
  let count = 0;
</script>

<div>
  <p>count : {count}</p>
</div>
```

변수의 선언은 2번째 줄과 같이, `<script>` 태그 안에서 일반 자바스크립트 변수 선언하듯이 선언합니다. 사용하는 방법은 10번째 줄관 같이 `{변수명}`과 같이 사용합니다.

### export를 사용한 변수

```svelte {linenos=inline,hl_lines=[2]}
<script>
	export let foo;
	export const bar = 'readonly';

	// Values that are passed in as props
	// are immediately available
	console.log({ foo });
</script>
```

만약 변수 선언할 때 `export`를 붙였다면, 해당 변수는 이 컴포넌트를 사용한 곳에서 읽을 수 있게 됩니다. 자바스크립트 모듈에서 export를 붙인 것과 동일합니다.

만약 변수 선언 시 `let`이 아닌 `const`를 사용하였다면, 이 변수는 읽기 전용이 됩니다.

### 반응형 변수

```svelte {linenos=inline,hl_lines=["4-6", 11]}
<script>
  let count = 0;

  function addOne() {
    count = count + 1;
  }
</script>

<div>
  <p>count : {count}</p>
  <button on:click={addOne}>add one</button>
</div>
```

스벨트는 리액트와 다르게 useState와 같은 메서드를 이용하여 선언을 할 필요가 없습니다. 그냥 일반 변수처럼 선언한 후, 핸들링하는 함수를 만들고 사용하기만 하면 됩니다. 4-6번째 줄과 같이 `<script>` 태그 안에 1을 더해주는 함수 addOne()을 만들어 주고 11번째 줄의 `<button>` 태그에 onclick 이벤트로 달아주면 됩니다.

![반응형 변수 테스트](/images/p/svelte-and-sveltekit/svelte_var1.gif)

### `$:` 구문을 이용하여 반응형 업데이트

```svelte {linenos=inline,hl_lines=[9, 17]}
<script>
  let a = 0;
  let b = 0;

  function add(a, b) {
    return a + b;
  }

  $: sum = add(a, b);
</script>

<div>
  <input type="number" bind:value={a} />
  +
  <input type="number" bind:value={b} />
  =
  <span>{sum}</span>
</div>
```

위 예시는 `a`와 `b`를 더하는 코드입니다. input으로 `a`값과 `b`값을 받아서 값을 저장한 후 더해서 `sum`으로 보여줍니다. `bind:value`는 일단 모르셔도 됩니다. input의 value를 뒤의 변수와 연결시켜주는 역할을 한다는 정도만 이해하시면 됩니다.여기서 `$:` 다음에 나오는 변수들은 스벨트에서 자동으로 관찰(Observe)하고 있다, 변경이 감지되면 즉각적으로 뒤에 있는 코드 `add(a, b)`를 실행하게 됩니다.

![`$:` 구문을 이용한 반응형 변수 테스트](/images/p/svelte-and-sveltekit/svelte_var2.gif)

```svelte {linenos=inline,linenostart=5}
  function add(b) {
    return a + b;
  }

  $: sum = add(b);
```

만약 코드 중 일부가 위와 같이 바뀌면 어떻게 될까요? `$:` 뒤에 변수가 `b`만 존재하므로 `a`의 값이 변경될 때는 `sum`이 업데이트되지 않습니다. 오로지 `b`의 값이 변경될 때만 `sum`값이 업데이트되게 됩니다.

그럼 `$:`를 안 쓰면 어떻게 될까요?

```svelte {linenos=inline}
<script>
  let a = 0;
  let b = 0;
</script>

<div>
  <input type="number" bind:value={a} />
  +
  <input type="number" bind:value={b} />
  =
  <span>{a + b}</span>
</div>

```

`$:` 구문을 사용했을 때와 크게 다르지 않습니다. `$:` 구문을 사용하면 별도의 변수로 선언할 수 있고, 원하는 변수가 변경됐을 때만 업데이트 하게 만들 수 있다는 장점이 있을 것으로 보입니다.

### `$` 접두사를 이용한 svelte/store 사용

svelte/store는 다른 컴포넌트에서 해당 변수를 반응형을 유지하면서 쉽게 접근할 수 있게 만들어주는 svlete 모듈입니다.

```javascript {linenos=inline}
/* count.js */
import {writable} from 'svelte/store';

export const count = writable(0);
```

```svelte {linenos=inline,hl_lines=[3,6,14]}
<!-- index.svelte  -->
<script>
  import {count} from './count.js'

  function addOne() {
    $count = $count + 1;
  }
</script>

<div>
  <a href="/test">move</a>
  <br />

  <button on:click={addOne}>count is {$count}</button>
</div>
```

```svelte {linenos=inline,hl_lines=[3,10]}
<!-- test.svelte -->
<script>
  import {count} from './count.js'
</script>

<div>
  <a href="/">back</a>
  <br />

  <span>count is {$count}</span>
</div>
```

위의 예제 코드에서는 `count.js`에서 변수를 선언한 후, `index.svelte`와 `test.svelte`에서 사용하는 예시입니다. store된 변수에 접근할 때는 예시처럼 변수명 앞에 `$` 접두사를 붙여야 합니다.

![$ 접두사를 이용한 store 테스트](/images/p/svelte-and-sveltekit/svelte_var3.gif)

## 제어문

스벨트 템플릿 문법에서 흐름을 제어하는 방법은 if, each, await, key 이렇게 4가지가 있습니다. 이 템플릿들의 시작은 `{# ...}`이며, 끝은 `{/ ...}`로 표시합니다.

### `{#if ...}`

```svelte
{# if 표현식}
 <!-- ... -->
{:else if 표현식}
 <!-- ... -->
{:else}
 <!-- ... -->
{/ if}
```

사용 방법은 일반 if문과 동일합니다. 중괄호 안의 `#`이나 `:`, `/`을 주의해서 사용해주시면 됩니`다.

### `{#each ...}`

```svelte
{#each expression as name, index (key)}
  <!-- ... -->
{/each}
```

자바스크립트의 `Array.prototype.map()`과 사용법이 유사합니다. 첫 번째 인자로 배열 내부의 변수의 이름을, 두 번째 인자로 해당 인자의 index값을 받습니다. `(key)`는 Svelte가 요소의 변경을 감지하고 수정할 수 있도록 도와주는 키값입니다. React에서는 이러한 반복문 안에서 컴포넌트들에게 key값을 넘겨주는 것이 필수이지만, Svelte에서는 에러가 나지 않습니다.

```svelte
{#each items as {id, ...rest}}
  <li>
    <span>{id}</span>
    <MyComponent values={rest}/>
  </li>
{/each}
```

또한 이렇게 내부에서 구조 분해 할당이나 나머지 연산자를 사용할 수도 있습니다.

```svelte
{#each todos as todo}
  <p>{todo.text}</p>
{:else}
  <p>No tasks today!</p>
{/each}
```

값이 없을 경우 `{:else}` 블록을 이용하여 해당 내용을 렌더링 할 수도 있습니다.

```svelte
<script>
  let c = [];

  function addValue() {
    const copiedC = c.slice();
    copiedC.push(Math.ceil(Math.random()*10));
    c = copiedC;
  }

  function cleanAll() {
    c = [];
  }
</script>

<div>
  <button on:click={addValue}>add value</button>
  <button on:click={cleanAll}>clear</button>
  <ul>
  {#each c as item, index (index)}
    <li>{index} : {item}</li>
  {:else}
    <li>list is empty.</li>
  {/each}
  </ul>
</div>
```

간단한 반복문의 예제 코드입니다.

![반복문 테스트](/images/p/svelte-and-sveltekit/svelte_each.gif)

### `{#await ...}`

```svelte
<!-- 전체 제어문 -->
{#await expression}
  <!-- 보류 -->
{:then name}
  <!-- 성공 -->
{:catch name}
  <!-- 실패 -->
{/await}

```

```svelte
<!-- 보류 상태와 성공 상태를 한 문장으로 처리한 제어문 -->
{#await expression then name}
  <!-- 성공 시에만 -->
{/await}
```

```svelte
<!-- 보류 상태와 실패 상태를 한 문장으로 처리한 제어문 -->
{#await expression catch name}
  <!-- 실패 시에만 -->
{/await}
```

Svelte는 비동기 문법에 대한 제어문도 지원합니다. React에서는 동일한 기능을 구현하려면 useState로 새로운 상태 객체를 만들어야 했지만, Svelte에서는 문법적으로 지원합니다. `Promise`는 `pending(보류)`, `fulfilled(성공)`, `rejected(실패)` 이렇게 3가지 상태를 가질 수 있습니다.
보류와 성공 상태를 하나로 묶거나, 보류와 실패 상태를 하나로 묶어 처리할 수도 있습니다. 이 제어문은 SSR 모드에서도 사용할 수 있는데, 이때 보류 상태만 서버에서 렌더링됩니다.

```svelte
<script>
  let resolve_promise = resolvePromise();
  let reject_promise = rejectPromise();

  async function resolvePromise() {
    return Promise.resolve('Hello svelte!');
  }

  async function rejectPromise() {
    return Promise.reject({message: "내부 에러"});
  }
</script>

<div>
  {#await resolve_promise}
    <p>대기 중...</p>
  {:then value}
    <p>값: {value}</p>
  {:catch error}
    <p>처리 실패: {error.message}</p>
  {/await}
  <hr>
  {#await reject_promise catch error}
    <p>처리 실패: {error.message}</p>
  {/await}
</div>
```

간단한 예시코드입니다. resolve만 하는 Promise 함수(resolvePromise)와 reject만 하는 Promise 함수(rejectPromise)를 렌더링하는 코드입니다.

![비동기 구문 테스트](/images/p/svelte-and-sveltekit/svelte_await.gif)

### `{#key ...}`

```svelte
{#key expression}
  <!-- ... -->
{/key}
```

키 블록은 표현식의 값이 변경될 때 내용을 지우고 재생성합니다. 값이 변경될 때 요소의 애니메이션을 재생하고 싶을 때 유용합니다.

## 기타 블록들

### 텍스트 표현식

```svelte
{표현식}
```

텍스트 표현식에는 자바스크립트 표현식도 포함될 수 있습니다. 다만 정규식(RegExp)을 사용할 때는 괄호로 묶어서 사용해야 합니다.

```svelte
<div>{(/^[A-Za-z ]+$/).test(value) ? x : y}</div>
```

### 주석

```svelte
<!-- 이 블록이 주석입니다. -->
```

Svetle의 주석은 HTML 주석과 동일합니다. 무시하고 싶은 오류나 경고를 비활성화 할 때 사용하는 `svelte-ignore`을 추가해 주고 싶을 때도 이 주석 블록을 사용합니다.

### `{@html ...}`

```svelte
{@html expression}
```

`{@html ...}` 표현식은 React의 `dangerouslySetInnerHTML`와 유사합니다. Svelte는 텍스트 표현식에서 `<`나 `>`와 같은 문자를 제거하고 표시하지만 이 표현식을 사용했을 경우에는 그렇지 않습니다. 따라서 XSS 공격에 매우 취약하므로 사용에 주의해야 합니다. 또한 이 내부에 오는 코드들은 Svelte가 컴파일하지 않습니다.

### `{@debug ...}`

```svelte
{@debug}
{@debug var1, var2, ..., varN}
```

`console.log(...)`를 사용하는 대신 이 표현식을 사용합니다. 만약 devtools가 열려있다면 코드 실행을 중단하는 중단점 역할을 합니다. 이 블럭은 쉼표로 구별된 변수명만 허용되며, 임의의 표현식을 사용할 수 없습니다.

```svelte
<!-- 컴파일 됨 -->
{@debug user}
{@debug user1, user2, user3}

<!-- 컴파일 되지 않음 -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```

## 컴포넌트

Svelte의 컴포넌트는 약간 이질적일 수 있습니다.

```svelte
<!-- List.svelte -->
<script>
  export let textContent = "";
</script>

<li>{textContent}</li>
```

```svelte
<!-- index.svelte -->
<script>
  import List from './List.svelte';

  let list = ['a', 'b', 'c', 'd', 'e'];
</script>

<ul>
  {#each list as textContent}
    <List {textContent} />
  {/each}
</ul>
```

Svelte에서는 export를 선언한 변수가 속성 혹은 prop으로 사용됩니다. 변수에 기본값 설정도 가능합니다.

```svelte
<!-- Info.svelte -->
<script>
  export let name;
  export let version;
  export let speed;
  export let website;
</script>

<p>
  <code>{name}</code> 패키지의 속도는 {speed} 빠릅니다.
  <a href="https://www.npmjs.com/package/{name}">npm</a>에서 {version} 버전을 받을 수 있고
  <a href={website}>여기서 더 자세한 내용을 확인</a>할 수 있습니다.
</p>
```

```svelte
<!-- index.svelte -->
<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: '엄청나게',
		website: 'https://svelte.dev'
	};
</script>

<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>
```

이렇게 여러개의 속성값을 넘길 때는 하나하나 작성해도 되지만

```svelte
<Info {...pkg}/>
```

이렇게 구조분해할당을 사용하여 값을 넘겨줘도 됩니다.

## 요소의 이벤트 핸들링

### on:이벤트명

```svelte
on:eventname={handler}
on:eventname|modifiers={handler}
```

`on:` 지시문을 사용하여 태그의 이벤트를 제어할 수 있습니다.

```svelte
<script>
	let count = 0;

	function handleClick(event) {
		count += 1;
	}
</script>

<div>
  <!-- 변수 선언 후 사용 -->
  <button on:click={handleClick}>
    count: {count}
  </button>

  <!-- 인라인으로 사용 -->
  <button on:click={() => count += 1}>
    count: {count}
  </button>
</div>
```

함수를 만들어 함수명을 명시하거나, 성능 저하 없이 화살표 함수를 이용하여 인라인으로 사용할 수도 있습니다.

또한 다음과 같은 수정자(modifier)를 사용할 수도 있습니다.

- preventDefault - 핸들러 실행 전에 `event.preventDefault()` 호출.
- stopPropagation - `event.stopPropagation()` 호출하여 이벤트 전파 방지.
- passive - 터치/휠 이벤트에 대한 스크롤 성능 향상.
- nonpassive - `pssive: false`를 명시적으로 설정.
- capture - 캡처링 단계에서 핸들러 실행.
- once - 핸들러가 처음 실행된 후 제거.
- self - `event.target`일 경우에만 핸들러 실행
- trusted -`event.isTrusted`가 `true`일 경우에만 실행.

```svelte
<form on:submit|preventDefault={handleSubmit}>
    <!-- the `submit` event's default is prevented, so the page won't reload -->
</form>
```

수정자는 위와 같이 `|`를 붙인 후 사용하며, 여러개의 수정자를 사용할 수 있습니다. 여러개의 수정자를 사용할 경우도 `on:click|once|capture={...}`처럼 각 수정자 사이를 `|`로 연결하여 사용합니다.

## 컴포넌트의 이벤트 핸들링

컴포넌트에서 이벤트를 전달하는 방법에는 두 가지가 있습니다. 첫 번째는 이벤트 핸들러를 직접 전달하여 사용하는 방법이고, 두 번째는 [createEventDispatcher](https://svelte.dev/docs#run-time-svelte-createeventdispatcher)를 사용하는 방법입니다.

### 직접 전달

```svelte
<!-- Button.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let click;
  const dispatch = createEventDispatcher();
</script>

<button on:click={() => click('test')}> click! </button>
```

```svelte
<!-- index.svelte -->
<script>
  import Button from './Button.svelte';

  function callbackFunction(detail) {
    alert(`Notify fired! Detail: ${detail}`);
  }
</script>

<ul>
  <Button click={callbackFunction} />
</ul>
```

전달받은 함수를 컴포넌트에서 직접 호출하는 방법입니다.

### createEventDispatcher

```svelte
<!-- Button.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('notify', 'detail value')}>
  click!
</button>
```

```svelte
<!-- index.svelte -->
<script>
  import Button from './Button.svelte';

  function callbackFunction(event) {
    alert(`Notify fired! Detail: ${event.detail}`);
  }
</script>

<ul>
  <Button on:notify={callbackFunction} />
</ul>
```

createEventDispatcher 함수를 이용하여 함수를 받아오는 방식입니다. `dispatch(type, detail)`로 함수를 호출하며 `on:이벤트명`에서 이벤트명이 `type`에 해당되고, `detail`이 `event.detail`의 값으로 들어가게 됩니다.

# 스벨트 킷

## Endpoints

스벨트 킷의 서버 사이드 기능 중 하나인 **엔드포인트**에 대해서 설명합니다.

```ts
/* [slug].json.ts */

import db from '$lib/database';
import type {RequestHandler} from '@sveltejs/kit';
import type {Locals} from '$lib/types';

export const get: RequestHandler<Locals> = ({params}) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const {slug} = params;

  const article = await db.get(slug);

  if (article) {
    return {
      body: {
        article,
      },
    };
  }
};
```

스벨트 킷은 `.js` 및 `.ts` 파일을 엔드포인트로 인식합니다. `/todos/index.json.ts`와 같은 엔드포인트는 index가 생략되어 `/todos.json`와 같이 접근하며, 동적 경로는 `[id].ts`와 같은 형식으로 사용할 수 있습니다.

함수명을 `get`, `post`, `patch`와 같이 HTTP 메서드명과 동일하게 작성해줍니다. `delete`의 경우 자바스크립트에서 이미 사용중인 예약어이기 때문에 `del`로 축약하여 사용합니다.

### Request

```ts
/* [slug].json.ts */

import db from '$lib/database';
import type {RequestHandler} from '@sveltejs/kit';
import type {Locals} from '$lib/types';

export const get: RequestHandler<Locals> = ({params}) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const {slug} = params;

  const article = await db.get(slug);

  if (article) {
    return {
      body: {
        article,
      },
    };
  }
};
```

request에는 params 말고도 body, locals, method, host, path, query, headers, rawBody 객체가 존재합니다.

- params: `Record<string, string>` - `[slug].json.ts`에서 slug와 같이 변수로 설정한 페이지 동적 경로.
- body: `ParameterizedBody<Body>`- 요청 바디
- locals: `Locals` - ./src/hooks.ts에서 저장한 데이터
- method : `string` - HTTP 메서드 종류 (GET, POST, PATCH 등)
- host: `string` - 요청 호스트 도메인
- path: `string` - 요청 경로
- query: `URLSearchParams` - URL 쿼리
- headers: `RequestHeaders` - HTTP 헤더 데이터
- rawBody: `RawBody` - Uint8Array 타입의 가공되지 않은 요청 바디

body의 파싱은 아래 내용을 따릅니다.

- content-type이 `text/plain`일 경우 `string` 형식으로 변환됩니다.
- content-type이 `application/json`일 경우 `JSONValue` 형식(`object`, `Array`, primitive)으로 변환됩니다.
- content-type이 `application/x-www-form-urlencoded` 또는 multipart/form-data일 경우 읽기 전용인 `FormData` 객체로 변환됩니다.
- 다른 모든 경우 `Uint8Array`로 변환됩니다.

### Response

```ts {hl_lines=["15-19"]}
/* [slug].json.ts */

import db from '$lib/database';
import type {RequestHandler} from '@sveltejs/kit';
import type {Locals} from '$lib/types';

export const get: RequestHandler<Locals> = ({params}) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const {slug} = params;

  const article = await db.get(slug);

  if (article) {
    return {
      body: {
        article,
      },
    };
  }
};
```

엔드포인트의 반환 객체는 status, header, body 이렇게 세 가지 속성으로 구성됩니다. Body에 객체가 들어갈 경우 headers의 Content-Type에 'application/json'을 명시해주지 않아도 자동으로 Json 객체로 변환됩니다.

- status?: `number` - [HTTP 상태 코드](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)를 명시 (200, 301, 400, 404 등)
- headers?: `ResponseHeaders` - HTTP 헤더 데이터 (Content-Type 등)을 명시
- body?: `Body` - 응답 바디 데이터

# References

- [스벨트 공식문서](https://svelte.dev/docs)
- [스벨트 공식 튜토리얼](https://svelte.dev/tutorial/basics)
- [스벨트 킷 공식문서](https://kit.svelte.dev/docs)
- [WICG - EventListenerOptions](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#eventlisteneroptions)
