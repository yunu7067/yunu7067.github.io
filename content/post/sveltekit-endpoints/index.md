---
title: "Sveltekit Endpoints"
description: "스벨트 킷 엔드포인트"
date: 2021-12-19T00:34:04+09:00
image: "svelte-kit-horizontal.svg"
math:
hidden: false
comments: true
draft: false
categories:
  - Frontend
  - Svelte
tags:
  - Frontend
  - Svelte
  - SvelteKit
---

스벨트 킷의 서버 사이드 기능 중 하나인 **엔드포인트**에 대해서 설명합니다.

## Endpoints

```ts
/* [slug].json.ts */

import db from "$lib/database";
import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";

export const get: RequestHandler<Locals> = ({ params }) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = params;

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

```ts {hl_lines=[7]}
/* [slug].json.ts */

import db from "$lib/database";
import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";

export const get: RequestHandler<Locals> = ({ params }) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = params;

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

- params: Record<string, string> - `[slug].json.ts`에서 slug와 같이 변수로 설정한 페이지 동적 경로.
- body: ParameterizedBody<Body> - 요청 바디
- locals: Locals - ./src/hooks.ts에서 저장한 데이터
- method : string - HTTP 메서드 종류 (GET, POST, PATCH 등)
- host: string - 요청 호스트 도메인
- path: string - 요청 경로
- query: URLSearchParams - URL 쿼리
- headers: RequestHeaders - HTTP 헤더 데이터
- rawBody: RawBody - Uint8Array 타입의 가공되지 않은 요청 바디

body의 파싱은 아래 내용을 따릅니다.

- content-type이 `text/plain`일 경우 `string` 형식으로 변환됩니다.
- content-type이 `application/json`일 경우 `JSONValue` 형식(`object`, `Array`, primitive)으로 변환됩니다.
- content-type이 `application/x-www-form-urlencoded` 또는 multipart/form-data일 경우 읽기 전용인 `FormData` 객체로 변환됩니다.
- 다른 모든 경우 `Uint8Array`로 변환됩니다.

### Response

```ts {hl_lines=["15-19"]}
/* [slug].json.ts */

import db from "$lib/database";
import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";

export const get: RequestHandler<Locals> = ({ params }) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = params;

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

- status?: number - [HTTP 상태 코드](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)를 명시 (200, 301, 400, 404 등)
- headers?: ResponseHeaders - HTTP 헤더 데이터 (Content-Type 등)을 명시
- body?: Body - 응답 바디 데이터

## References

[스벨트 킷 공식문서](https://kit.svelte.dev/docs#routing-endpoints)
