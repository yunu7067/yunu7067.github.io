---
title: "Content Security Policy"
description: "Content Security Policy"
lead: "'Content Security Policy: 페이지 설정에 의해 리소스 로드가 차단됨' 오류"
date: 2021-04-29T10:13:01+09:00
lastmod: 2021-04-29T10:13:01+09:00
draft: false
weight: 50
images: ["blob_err_msg.png", "blob_err_resolve.png"]
contributors: []
---

nginx 설정파일에서 Content Security Policy 정책을 사용하는 경우, blob 리소스가 차단될 수 있다. 이러한 경우 Content-Security-Policy 맨 뒤에 `worker-src blob:`을 추가해주면 된다.

{{< img src="blob_err_msg.png" alt="blob_err_msg" caption="<em>에러 메시지</em>" class="border-0" >}}
{{< img src="blob_err_resolve.png" alt="blob_err_resolve" caption="<em>해결 방법</em>" class="border-0" >}}
