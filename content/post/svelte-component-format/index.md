---
title: "스벨트: 컴포넌트 구조"
description: "Svelte: Component Format"
date: 2021-12-26T21:02:35+09:00
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

### \<script\>

`<script>` 블록은 자바스크립트(혹은 타입스크립트)를 작성하는 부분입니다. 페이지의 로직이 위치하며 일반적으로 최상위에 위치합니다. 스크립트 블록에는 네 가지 규칙이 있습니다.

1. 컴포넌트 prop을 생성하는 export
2. '리액티브'한 할당
3. 리액티브를 위한 `$:` 구문
4. svelte/store를 편하게 사용하기 위한 `$` 접두사

`<script>` 태그에 `context="module"` 속성값이 추가되면 처음 한 번만 실행됩니다.

### \<style\>

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

## References

[스벨트 공식문서](https://svelte.dev/docs#component-format)
