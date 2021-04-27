---
title: "Type"
description: "타입"
lead: ""
date: 2021-04-27T15:00:53+09:00
lastmod: 2021-04-27T15:00:53+09:00
draft: false
images: []
menu:
  docs:
    parent: "kotlin"
weight: 12002
toc: true
---

## 숫자

### 정수

_Integer types_

| 타입명 | 사이즈(bits) | 최소값          | 최댓값            |
| :----- | :----------- | :-------------- | :---------------- |
| Byte   | 8            | -128            | 127               |
| Short  | 16           | -32768          | 32767             |
| Int    | 32           | -2<sup>31</sup> | 2<sup>31</sup>- 1 |
| Long   | 64           | -2<sup>63</sup> | 2<sup>63</sup>- 1 |
{.table-striped}

초기화 시 명시하지 않으면 해당 범위에 맞는 타입이 자동으로 추론된다.

```
val one = 1 // Int
val threeBillion = 3000000000 // Long
val oneLong = 1L // Long
val oneByte: Byte = 1
```

### 부동소수점

_Floating-point types_

| 타입명 | 사이즈(bits) | 가수부 | 지수부 | 소수점 자릿수 |
| :----- | :----------- | :----- | :----- | ------------- |
| Float  | 32           | 24     | 8      | 6-7           |
| Double | 64           | 53     | 11     | 15-16         |
{.table-striped}

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

_Literal constants_

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

### JVM에서의 숫자

_Numbers representation on the JVM_

자바에서는 숫자를 int, double과 같은 원시형으로 표현한다. `Int?`와 같이 Nullable하게 작성한 경우를 제외하고 Int, Double은 JVM에서 int, double로 변환된다.

일치(`===`)연산자를 사용해 비교했을 때 같은 값이더라도, 결과가 다를 수 있다.

```
val a: Int = 100
val boxedA: Int? = a
val anotherBoxedA: Int? = a

val b: Int = 10000
val boxedB: Int? = b
val anotherBoxedB: Int? = b

println(boxedA === anotherBoxedA) // true
println(boxedB === anotherBoxedB) // false
```

동등(`==`) 연산자를 사용하여 비교할 경우 값만 비교하기 때문에 `true`가 반환된다.

```
val c: Int = 10000
println(c == c) // Prints 'true'
val boxedC: Int? = c
val anotherBoxedC: Int? = c
println(boxedC == anotherBoxedC) // Prints 'true'
```

### 명시적 형변환

_Explicit conversions_

우리는 큰 타입에 작은 타입을 대입하면 자동으로 형변환을 해줄 것이라 생각한다. 아래와 같은 흐름을 생각해 볼 수 있다.

```
// Hypothetical code, does not actually compile:
val a: Int? = 1 // A boxed Int (java.lang.Integer)
val b: Long? = a // implicit conversion yields a boxed Long (java.lang.Long)
print(b == a) // Surprise! This prints "false" as Long's equals() checks whether the other is Long as well
```

하지만 코틀린에서는 암시적 형변환을 지원하지 않는다. 따라서 명시적으로 형변환을 해 주어야 한다.

- toByte(): Byte
- toShort(): Short
- toInt(): Int
- toLong(): Long
- toFloat(): Float
- toDouble(): Double
- toChar(): Char

대부분의 경우 타입이 문맥에서 유추되고 적절한 변환을 위해 산술 연산이 오버로드되기 때문에 명시적 형변환이 필요하지 않다. 예를들면 아래와 같다.

```
val l = 1L + 3 // Long + Int => Long
```

### 연산자

_Operations_

코틀린은 `+`, `-`, `*`, `/`, `%`과 같은 표준 산술 연산자를 지원한다. 또한 이러한 [연산자들은 오버라이딩이 가능하다.](https://kotlinlang.org/docs/operator-overloading.html)

```
println(1 + 2)
println(2_500_000_000L - 1L)
println(3.14 * 2.71)
println(10.0 / 3)
```

### 부동소수점 비교

_Floating-point numbers comparison_

- 동등 비교: `a == b`와 `a != b`
- 비교 연산자: `a < b`, `a > b`, `a <= b`, `a >= b`
- 범위 인스턴스와 범위 체크: `a..b`, `x in a..b`, `x !in a..b`

피연산자 `a`와 `b`가 타입이 정적인 `Float`나 `Double`, Nullable에 대응되는 값일 경우 IEEE 754 표준을 따른다. 하지만 `Any`, `Comparable<...>`, 타입 파라미터와 같이 정적이지 않은 부동소수점의 경우, `Float`와 `Double`에 구현된 `equals`와 `compareTo` 연산자를 따른다. 표준과 일치하지 않는 것들은 아래와 같다.

- `NaN`은 자신과 동등한 것으로 간주된다.
- `NaN`은 `POSITIVE_INFINITY`를 포함한 다른 요소보다 큰 것으로 간주된다.
- `-0.0`은 `0.0`보다 작은 것으로 간주된다.

### 부호가 없는 정수 (BETA)

_Unsigned integers_

<a href="https://kotlinlang.org/docs/components-stability.html" target="_blank">
{{< alert icon="⚠️" text="이 기능은 코틀린 1.3 이상만 사용이 가능하며, 아직 베타 상태입니다." >}}
</a>

- UByte: 8 비트 부호 없는 정수형, 0 ~ 255
- UShort: 16 비트 부호 없는 정수형, 0 ~ 65535
- UInt: 32 비트 부호 없는 정수형, 0 ~ 2^32 - 1
- ULong: 64 비트 부호 없는 정수형, 0 ~ 2^64 - 1

부호가 없는 자료형도 부호가 있는 자료형의 대부분의 연산을 지원한다.. 부호가 없는 자료형은 아직 안정적이지 않기 때문에 inline class로 구현된다.

#### 부호가 없는 배열과 범위

_Unsigned arrays and ranges_

원래 자료형과 마찬가지로 부호가 없는 자료형을 나타내는 배열이 있다.

- UByteArray: 부호가 없는 Byte의 배열
- UShortArray: 부호가 없는 Short의 배열
- UIntArray: 부호가 없는 Int의 배열
- ULongArray: 부호가 없는 Long의 배열

정수 배열과 마찬가지로 boxing 오버헤드가 없는 `Array`와 유사한 API를 제공한다.. 또한 range 함수(`a..b`)도 지원한다.

#### 리터럴 문자

부호가 없는 정수를 사용하기 위해 코틀린에서는 리터럴 문자를 제공한다.

- `u`과 `U` : 자세한 자료형은 추론을 통해 결정된다. 추론되는 타입이 없으면 컴파일러가 사이즈에 따라 기본적으로 `UInt`나 `ULong`로 변환한다.
  ```
  val b: UByte = 1u  // UByte, expected type provided
  val s: UShort = 1u // UShort, expected type provided
  val l: ULong = 1u  // ULong, expected type provided
  val a1 = 42u // UInt: no expected type provided, constant fits in UInt
  val a2 = 0xFFFF_FFFF_FFFFu // ULong: no expected type provided, constant doesn't fit in UInt
  ```
- `uL`과 `UL` : 부호가 없는 Long형의 명시적 타입
  ```
  val a = 1UL // ULong, even though no expected type provided and constant fits into UInt
  ```

## 불리언

_Boolean_

불리언은 `true`와 `false` 두 상태를 가지는 객체이다. `Boolean?`에 의해 `null`값도 가질 수 있다. 아래와 같은 연산자를 가지고 있다.

- `||` – 합 (logical OR)
- `&&` – 곱 (logical AND)
- `!` - 부정 (logical NOT)
- `||`과 `&&`는 지연 동작한다.

  ```
  val myTrue: Boolean = true
  val myFalse: Boolean = false
  val boolNull: Boolean? = null

  println(myTrue || myFalse)
  println(myTrue && myFalse)
  println(!myTrue)
  ```

## 문자

_Characters_

`Char`은 작은 따옴표(`'`)를 사용하여 표현된다.
특수문자는 역슬래시 `\`로 표현된다. 지원하는 특수문자는 다음과 같다. `\t`, `\b`, `\n`, `\r`, `\'`, `\"`, `\\`, `\$`

다른 문자를 인코딩하려면 유니코드 플래그(`\u`)를 사용한다.

```
val aChar: Char = 'a'

println(aChar)
println('\n') //prints an extra newline character
println('\uFF00')
```

## 문자열

_Strings_

`String`은 큰따옴표(`"`)를 사용하여 표현한다.

```
val str = "abcd 123"
```

문자열은 `s[i]`를 사용하여 각각의 문자에 접근할 수 있고, `for` 반복문을 사용할 수 있다.

```
for (c in str) {
    println(c)
}
```

`String`은 불변이다. 한번 초기화되면 값을 변경할 수 없다. 모든 연산자는 새로운 `String` 객체를 생성한다.

```
val str = "abcd"
println(str.toUpperCase()) // Create and print a new String object
println(str) // the original string remains the same
```

`+` 연산자로 문자열을 연결할 수 있다. 다른 자료형과도 동작한다.

```
val s = "abc" + 1
println(s + "def")
```

### 문자열 리터럴

_String literals_

코틀린에는 두 가지 문자열 리터럴이 있다.

- 이스케이프 문자(escaped characters)를 포함할 수 있는 이스케이프 문자열(escaped strings)
  ```
  val s = "Hello, world!\n"
  ```
- 줄바꿈이나 임의의 문자가 포함할 수 있는 원시 문자열(raw strings)

  원시 문자열은 삼중 큰따옴표(`"""`)를 사용하여 표현된다.

  ```
  val text = """
    for (c in "foo")
        print(c)
  """
  ```

  원시 문자열에서 앞의 공백을 없애려면 [`trimMargin()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-margin.html) 함수를 사용한다. `|` 접두사가 기본값이지만, `trimMargin(">")`과 같이 다른 문자를 사용할 수도 있다.

  ```
  val text = """
    |Tell me and I forget.
    |Teach me and I remember.
    |Involve me and I learn.
    |(Benjamin Franklin)
    """.trimMargin()
  ```

### 문자열 템플릿

_String templates_

문자열 리터럴에는 템플릿 표현식이 포함될 수도 있다. 템플릿 표현식은 달러 기호(`$`)를 사용한다. 표현식이 끝나는 지점을 띄어쓰기나 문자열 끝으로 인식하기 때문에 표현식 뒤에 곧바로 다른 문자가 오면 안된다.

```
val i = 10
println("i = $i") // prints "i = 10"
```

또는 중괄호가 포함될 수도 있다. 중괄호가 포함될 경우 표현식 뒤에 띄어쓰기를 쓰지 않아도 된다.

```
val s = "abc"
println("$s.length is ${s.length}") // prints "abc.length is 3"
```

이스케이프 문자열과 원시 문자열 모두 사용할 수 있지만 원시 문자열에서는 아래와 같이 사용해야 한다.

```
val price = """
${'$'}9.99
"""
```

## 배열

_Arrays_

`Array`는 연산자 오버로딩에 의해 `[]`로 변환되는 `get`/`set` 함수가 있고, `size` 프로퍼티를 가진다. 또한 다른 유용한 멤버 함수가 있다.

```
class Array<T> private constructor() {
    val size: Int
    operator fun get(index: Int): T
    operator fun set(index: Int, value: T): Unit

    operator fun iterator(): Iterator<T>
    // ...
}
```

`arrayOf()`를 사용하면 값을 포함한 배열을 만들 수 있다. `arrayOf(1, 2, 3)`과 같이 작성하면 `[1, 2, 3]`이라는 배열을 생성할 수 있다. 또한 `arrayOfNulls()`를 사용하면 `null`이 포함된 배열을 만들 수 있다.

또다른 방법으로는 `Array` 생성자와 배열의 크기를 전달하여 값을 얻는 방법이 있다.

```
// Creates an Array<String> with values ["0", "1", "4", "9", "16"]
val asc = Array(5) { i -> (i * i).toString() }
asc.forEach { println(it) }
```

코틀린에서 배열은 상수이다. 즉 `Array<String>`을 `Array<Any>`에 할당할 수 없기 때문에 런타임 때 오류를 방지한다. (`Array<out Any>`를 사용하면 할당할 수 있다. 자세한 내용은 [Type Projections](https://kotlinlang.org/docs/generics.html#type-projections) 참고)

### 원시형 배열

_Primitive type arrays_

코틀린에서는 Boxing 오버헤드 없는 원시형에 대한 배열(`ByteArray`, `ShortArray`, `IntArray` 등)도 존재한다. 이것들은 `Array`를 상속받은 객체는 아니지만 동일한 메서드들과 프로퍼티를 가지고 있다. 또한 동일한 생성 함수를 사용한다.

```
val x: IntArray = intArrayOf(1, 2, 3)
x[0] = x[1] + x[2]
```

```
// Array of int of size 5 with values [0, 0, 0, 0, 0]
val arr = IntArray(5)

// e.g. initialise the values in the array with a constant
// Array of int of size 5 with values [42, 42, 42, 42, 42]
val arr = IntArray(5) { 42 }

// e.g. initialise the values in the array using a lambda
// Array of int of size 5 with values [0, 1, 2, 3, 4] (values initialised to their index value)
var arr = IntArray(5) { it * 1 }
```

## Etc

- Unit : 리턴값 없음
