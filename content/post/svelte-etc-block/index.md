---
title: "스벨트④: 기타 블록들"
description: "Svelte: Etc Block"
date: 2022-01-01T03:15:01+09:00
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

### \{@html ...\}

```svelte
{@html expression}
```

`{@html ...}` 표현식은 React의 `dangerouslySetInnerHTML`와 유사합니다. Svelte는 텍스트 표현식에서 `<`나 `>`와 같은 문자를 제거하고 표시하지만 이 표현식을 사용했을 경우에는 그렇지 않습니다. 따라서 XSS 공격에 매우 취약하므로 사용에 주의해야 합니다. 또한 이 내부에 오는 코드들은 Svelte가 컴파일하지 않습니다.

### \{@debug ...\}

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

## Reference

[스벨트 공식문서](https://svelte.dev/docs#template-syntax-html)
