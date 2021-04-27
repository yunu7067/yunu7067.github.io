---
title: "서론 "
description: "kotlin introduction"
lead: "Kotlin"
date: 2021-04-27T10:08:25+09:00
lastmod: 2021-04-27T10:08:25+09:00
draft: false
images: []
menu:
  docs:
    parent: "kotlin"
weight: 12001
toc: true
---

## Type

### 정수

Integer types

| 타입명 | 사이즈(bits) | 최소값                             | 최댓값                              |
| :----- | :----------- | :--------------------------------- | :---------------------------------- |
| Byte   | 8            | -128                               | 127                                 |
| Short  | 16           | -32768                             | 32767                               |
| Int    | 32           | -2,147,483,648 (-2 31)             | 2,147,483,647 (2 31- 1)             |
| Long   | 64           | -9,223,372,036,854,775,808 (-2 63) | 9,223,372,036,854,775,807 (2 63- 1) |

초기화 시 명시하지 않으면 해당 범위에 맞는 타입이 자동으로 추론된다.

```
val one = 1 // Int
val threeBillion = 3000000000 // Long
val oneLong = 1L // Long
val oneByte: Byte = 1
```

### 부동소수점

Floating-point types

| 타입명 | 사이즈(bits) | 가수부 | 지수부 | 소수점 자릿수 |
| :----- | :----------- | :----- | :----- | ------------- |
| Float  | 32           | 24     | 8      | 6-7           |
| Double | 64           | 53     | 11     | 15-16         |

정수 타입과 구별되는 점은 온점(`.`)이다.

```
val pi = 3.14 // Double
// val one: Double = 1 // Error: type mismatch
val oneDouble = 1.0 // Double
```

뒤에 `f` 혹은 `F`를 붙여 `Float`를 명시할 수 있다. 소수점 자릿수가 6-7개가 넘어가면 자동으로 반올림된다.

```
val e = 2.7182818284 // Double
val eFloat = 2.7182818284f // Float, actual value is 2.7182817
```

코틀린은 암시적인 형변환이 없다. 예를들어 Double형에는 Float형이나 Int형, 기타 다른 숫자형을 넣을 수 없다.

```
fun main() {
    fun printDouble(d: Double) { print(d) }

    val i = 1
    val d = 1.0
    val f = 1.0f

    printDouble(d)
//    printDouble(i) // Error: Type mismatch
//    printDouble(f) // Error: Type mismatch
}
```

### 리터럴 문자

Literal constants

정수형
8진법 리터럴(0)은 지원하지 않는다.

- Decimals: 123
  - Longs are tagged by a capital L: 123L
- Hexadecimals: 0x0F
- Binaries: 0b00001011

부동소수점

- Doubles by default: 123.5, 123.5e10
- Floats are tagged by f or F: 123.5f

숫자에 밑줄 기호(`_`, underscores)를 사용해 더 읽기 쉽게 만들 수도 있다.

```
val oneMillion = 1_000_000
val creditCardNumber = 1234_5678_9012_3456L
val socialSecurityNumber = 999_99_9999L
val hexBytes = 0xFF_EC_DE_5E
val bytes = 0b11010010_01101001_10010100_10010010
```

### Etc

- Unit : 리턴값 없음

## [Null safety](https://kotlinlang.org/docs/null-safety.html)

- `throw NullPointerException()` 호출
- `!!` 연산자
- `?.` safe call operator
- `if (~~) ~~ else ~~` Elvis operator

### .
