---
title: "스벨트⑥: 이벤트 핸들링"
description: "Svelte: Event Handling"
date: 2022-01-01T04:50:54+09:00
image: svelte-horizontal.svg
math:
hidden: false
comments: true
draft: true
categories:
  - Frontend
  - Svelte
tags:
  - Frontend
  - Svelte
---

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

## References

[스벨트 공식문서](https://svelte.dev/docs#template-syntax-element-directives)

[WICG - EventListenerOptions](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#eventlisteneroptions)
