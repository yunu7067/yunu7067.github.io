---
title: "스벨트⑤: 컴포넌트화"
description: "Svelte: Component"
date: 2022-01-01T03:42:02+09:00
image: svelte-horizontal.svg
math:
hidden: false
comments: true
draft: flase
categories:
  - Frontend
  - Svelte
tags:
  - Frontend
  - Svelte
---

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

## Reference

[스벨트 공식문서](https://svelte.dev/docs#component-format-script-1-export-creates-a-component-prop)

[스벨트 공식 튜토리얼](https://svelte.dev/tutorial/declaring-props)
