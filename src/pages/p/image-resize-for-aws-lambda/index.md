---
layout: '@lays/BlogPost.astro'
title: 'AWS 람다, S3를 이용한 이미지 리사이징'
publishDate: 2022-04-07
description: 'AWS 서비스를 이용하여 이미지를 리사이즈하고 저장하는 방법.'
tags: ['Backend', 'AWS']
series: 'AWS'
---

# 도입 이유

처음에는 스프링 내에서 리사이즈 라이브러리(net.coobird의 thumbnailator)를 이용하여 이미지를 small/medium/large 3개의 사이즈로 리사이즈 하려고 했었습니다. 하지만 AWS EC2의 프리티어급 인스턴스(t2.micro)는 기껏해야 1 v코어와 1 GB의 메모리밖에 되지 않아 이미지 리사이징이라는 무거운 프로세스를 서비스를 제공하면서 돌리기엔 무리가 있었습니다.

![btop](https://user-images.githubusercontent.com/57068092/162099081-1ddc11fa-1726-479e-b8d4-1b55e7f2fdd6.png)

btop으로 모니터링해보니 cpu와 메모리를 꽉꽉 채워져 이내 인스턴스가 멈춰버리는 불상사가 발생해버렸습니다. 그래서 AWS Lambda와 AWS S3를 이용하여 이미지 리사이징 동작만을 분리하였습니다.

# 도입 방법

## S3 버킷 생성

![image](https://user-images.githubusercontent.com/57068092/162099448-2f8dbcc2-d006-4982-b864-0a753676a86c.png)

버킷은 기본적으로 파일이 저장되는 버킷(bucketname-s3)과 리사이즈된 이미지가 저장되는 버킷((bucketname-s3-resized)를 생성해야합니다. 나중에 서비스에서 접근하기 위해 액세스는 퍼블릭으로 주었습니다.

## 역할 설정

### 정책 생성

IAM 정책에서 `AWSLambdaS3Policy`라는 이름의 정책을 생성한 후, 아래 json 코드로 역할을 줍니다. S3 IO 권한과 CloudWatch Logs 권한을 줍니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": ["logs:CreateLogStream", "logs:CreateLogGroup", "logs:PutLogEvents"],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "*"
    }
  ]
}
```

![image](https://user-images.githubusercontent.com/57068092/162100556-a410dabb-1630-455d-9d26-283b0487ac11.png)

생성된 권한 정책.

### 역할 생성

`lambda-s3-role`이란 역할을 생성하고, 위에서 만든 정책을 연결합니다.

![image](https://user-images.githubusercontent.com/57068092/162103365-a7447ffe-b013-4ea7-9901-97a93f545a5e.png)

![image](https://user-images.githubusercontent.com/57068092/162100786-2b220a2c-9bd0-4723-93b0-919064b37c19.png)

## 람다 생성

```javascript
// dependencies
const AWS = require('aws-sdk');
const util = require('util');
const sharp = require('sharp');

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  // Read options from the event parameter.
  console.log('Reading options from event:\n', util.inspect(event, {depth: 5}));

  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const dstBucket = srcBucket + '-resized';

  // Infer the image type from the file suffix.
  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log('Could not determine the image type.');
    return;
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase();
  if (imageType != 'jpg' && imageType != 'png') {
    console.log(`Unsupported image type: ${imageType}`);
    return;
  }

  // Download the image from the S3 source bucket.

  try {
    const params = {
      Bucket: srcBucket,
      Key: srcKey,
    };
    var origimage = await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.

  /**
   * SMALL (width 368)
   */
  const smallWidth = 368;
  const smallDstKey = 'small-' + srcKey;
  // Use the sharp module to resize the image and save in a buffer.
  try {
    var buffer = await sharp(origimage.Body)
      .resize({
        width: smallWidth,
        withoutEnlargement: true,
      })
      .toBuffer();
  } catch (error) {
    console.log(error);
    return;
  }

  // Upload the thumbnail image to the destination bucket
  try {
    const destparams = {
      Bucket: dstBucket,
      Key: smallDstKey,
      Body: buffer,
      ContentType: 'image',
    };

    const putResult = await s3.putObject(destparams).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  /**
   * MEDIUM (width 720)
   */
  const mediumWidth = 720;
  const mediumDstKey = 'medium-' + srcKey;
  // Use the sharp module to resize the image and save in a buffer.
  try {
    var buffer = await sharp(origimage.Body)
      .resize({
        width: mediumWidth,
        withoutEnlargement: true,
      })
      .toBuffer();
  } catch (error) {
    console.log(error);
    return;
  }

  // Upload the thumbnail image to the destination bucket
  try {
    const destparams = {
      Bucket: dstBucket,
      Key: mediumDstKey,
      Body: buffer,
      ContentType: 'image',
    };

    const putResult = await s3.putObject(destparams).promise();
  } catch (error) {
    console.log(error);
    return;
  }
  /**
   * LARGE (width 1440)
   */
  const largeWidth = 1440;
  const largeDstKey = 'large-' + srcKey;
  // Use the sharp module to resize the image and save in a buffer.
  try {
    var buffer = await sharp(origimage.Body)
      .resize({
        width: largeWidth,
        withoutEnlargement: true,
      })
      .toBuffer();
  } catch (error) {
    console.log(error);
    return;
  }

  // Upload the thumbnail image to the destination bucket
  try {
    const destparams = {
      Bucket: dstBucket,
      Key: largeDstKey,
      Body: buffer,
      ContentType: 'image',
    };

    const putResult = await s3.putObject(destparams).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  console.log('Successfully resized ' + srcBucket + '/' + srcKey + ' and uploaded to ' + dstBucket);
};
```

`sharp` 라이브러리를 사용하여 이미지를 리사이즈 하는 코드를 람다에 업로드해줍니다. 리사이징되는 이미지 사이즈는 서비스를 고려하여 LARGE (width 1440), MEDIUM (width 720), SMALL (width 368)로 설정하였습니다.

![image](https://user-images.githubusercontent.com/57068092/162099914-2afb25e8-94ca-4601-a09b-8e4c783932b7.png)

생성된 람다. 왼쪽 아래 S3 버킷은 이 시점에서는 아직 없어야 합니다.

## 람다 설정 편집

![image](https://user-images.githubusercontent.com/57068092/162100222-112bda93-d6b3-427a-ae0e-366e9d8b4d2c.png)

메모리는 1024MB, 임시 스토리지는 512MB(최솟값), 제한시간은 30초로 설정하고 위에서 생성한 역할을 설정해두었습니다.

## 트리거 추가

위에서 생성된 S3 버킷중 기본 버킷(`bucketname-s3`으로 만든)의 속성으로 들어가줍니다.

![image](https://user-images.githubusercontent.com/57068092/162101115-111a94d6-ee79-4dd1-b58c-c0705c770b49.png)

중간에 `이벤트 알림`에서 `이벤트 알림 생성`을 클릭.

![image](https://user-images.githubusercontent.com/57068092/162101189-66d74a9e-7cea-419f-8431-1aaf1180821b.png)

**이벤트 유형**은 `모든 객체 생성 이벤트` 체크.

![image](https://user-images.githubusercontent.com/57068092/162101207-95431cde-d01c-4be4-94c9-9550fe0c96dd.png)

**대상**은 Lambda 함수에 위에서 생성한 람다 함수 연결.

![image](https://user-images.githubusercontent.com/57068092/162101459-f2356e50-9cc2-466b-aaec-9e707ce2ce71.png)

다 했으면 람다의 트리거 부분에 아까 말했던 S3 버킷이 생기게 됩니다.

# 문제점

- 람다 실행 속도
  현재는 이미지 크기 제한과 런타임을 최대 30초로 제한을 해둔 상태입니다. 따라서 전체 서비스에서 이미지 리사이즈 속도를 고려해줘야하는 비효율적이고 번거로운 작업이 추가됩니다.

  -> 몇 초 간격으로 체크를 하는 동작이 추가되어야하나?

  -> 런타임을 Node.js가 아닌 Go나 .NET을 사용하면 속도가 좀 더 빨라질 지도?

# 참고문헌

- https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/with-s3-tutorial.html
