---
layout: '@lays/ContentLayout.astro'
title: Content Security Policy
description: 'Content Security Policy: 페이지 설정에 의해 리소스 로드가 차단됨'
publishDate: 2021-04-29T10:13:01+09:00
draft: false
tags: ['Nginx', 'Error']
---

## 문제점

![에러 메시지](/images/p/content-security-policy/blob_err_msg.png)
Content Security Policy : 페이지 설정에 의해 리소스 로드가 차단됨: blob:https://example.com ("script-src")

## 해결방안

nginx 설정파일에서 Content Security Policy 정책을 사용하는 경우, blob 리소스가 차단될 수 있다. 이러한 경우 Content-Security-Policy 맨 뒤에 `worker-src blob:`을 추가해주면 된다.

![nginx config에 추가](/images/p/content-security-policy/blob_err_resolve.png)
