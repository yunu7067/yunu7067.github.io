---
title: "자료형 체크와 변환"
description: "Type Checks and Casts"
lead: ""
date: 2021-04-27T16:34:14+09:00
lastmod: 2021-04-27T16:34:14+09:00
draft: false
images: []
menu:
  docs:
    parent: "kotlin"
weight: 12003
toc: true
---

## is와 !is 연산자

_is and !is operators_

`is` 연산자 혹은 부정형인 `!is` 연산자를 사용해 런타임 시간에 객체의 자료형을 체크한다.

```
if (obj is String) {
    print(obj.length)
}

if (obj !is String) { // same as !(obj is String)
    print("Not a String")
} else {
    print(obj.length)
}
```

## 똑똑한 형변환

_Smart casts_

대부분은 명시적인 형변환이 필요하지 않다. 코틀린 컴파일러가 `is`를 추적하고 변하지 않는 값에 대해서 형변환을 추천한다. 필요한 경우 (안전한) 형변환을 삽입한다.

```
fun demo(x: Any) {
    if (x is String) {
        print(x.length) // x is automatically cast to String
    }
}
```

컴파일러는 형변환 확인 후 반환하는 경우도 자동적으로 형변환 할 정도로 똑똑합니다.

```
if (x !is String) return

print(x.length) // x is automatically cast to String
```

`&&`와 `||`의 우측에 있는 식에도 마찬가지입니다.

```
// x is automatically cast to string on the right-hand side of `||`
if (x !is String || x.length == 0) return

// x is automatically cast to string on the right-hand side of `&&`
if (x is String && x.length > 0) {
    print(x.length) // x is automatically cast to String
}
```

`when` 표현식과 `while` 반복문에도 마찬가지로 동작합니다.

```
when (x) {
    is Int -> print(x + 1)
    is String -> print(x.length + 1)
    is IntArray -> print(x.sum())
}
```

이러한 형변환은 해당 변수가 체크하고 사용하는 사이에 변하지 않는다는 것을 컴파일러가 확증할 수 있을 때만 동작합니다. 정확하게 형변환은 아래와 같은 규칙으로 적용됩니다.

- val 지역변수 - [지역 위임 프로퍼티](https://kotlinlang.org/docs/delegated-properties.html)를 제외하고 항상
- val 프로퍼티 - 프로퍼티가 p;rivate거나 내부적일 때나
- var 지역변수
- var 프로퍼티 -

## "안전하지 않은" 형변환 연산자

_"Unsafe" cast operator_

## "안전한" (nullable) 형변환 연산자

_"Safe" (nullable) cast operator_

## 타입 제거와 제네릭 타입 체크

_Type erasure and generic type checks_

## 확인되지 않은 형변환

_Unchecked casts_
