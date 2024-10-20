# 문자열 덧셈 계산기(String Addition Calculator)

---

이 프로젝트는 우아한테크코스 프리코스 1주차 과제인 `입력한 문자열에서 숫자를 추출`하여 더하는 **문자열 덧셈 계산기**를 다루고 있습니다.

## 🚀 기능 요구 사항

- 입력한 문자열에서 숫자를 추출하여 더하는 계산기를 구현한다.

### 기능 목록

##### 문자열 덧셈

- `,`와 `:`을 구분자로 가지는 문자열을 구분자 기준으로 분리해 숫자의 합을 반환

```

결과 : 0
```

```
1,2:3
결과 : 6
```

##### 커스텀 구분자

- 문자열 앞부분의 `//`와 `\n` 사이에 위치하는 문자는 커스텀 구분자로 지정함

```
//;\n1;2;3
결과 : 6
```

- 이 경우 커스텀 구분자는 `;`

##### [ERROR]

- 사용자가 잘못된 값을 입력할 경우 [ERROR] 메시지와 함께 Error 발생 후 **애플리케이션 종료**

```
덧셈할 문자열을 입력해 주세요.
한:1:2
[ERROR]
```

```
덧셈할 문자열을 입력해 주세요.
1::2:,,3
[ERROR]
```

### 입출력 요구 사항

##### 입력

- 구분자와 양수로 구성된 문자열
- 구분자 `,`나 `:`를 기준으로 각 숫자의 합을 반환
  `1:2,3`
- 문자열 앞부분에 `//`와 `\n` 사이에 위치한 문자를 커스텀 구분자로 지정 가능
  `//;\n1;2;3`

##### 출력

- 덧셈 결과
  `결과 : 6`
- 사용자가 잘못된 값을 입력하면 **`[ERROR] 메시지`**
  `[ERROR]`

##### 실행 결과 예시

```
덧셈할 문자열을 입력해 주세요.
1,2:3
결과 : 6
```

```
덧셈할 문자열을 입력해 주세요.
//;\n1;2;3
결과 : 6
```

---

## 🛠️ 구현 상세

#### 구분자 처리

- 쉼표(`,`)와 콜론(`:`)을 구분자로 하여 입력된 문자열을 분리한다.
- 사용자로부터 입력받은 문자열을 구분자로 나누고, 각 숫자를 더한 결과를 반환한다.

##### 코드 예시

```
function computeResult(customSeparator, formattedUserInput) {
  const regex = customSeparator
    ? new RegExp(`[:,${customSeparator}]`)
    : new RegExp(`[:,]`);

  const result = formattedUserInput
    .split(regex)
    .map(Number)
    .reduce((acc, cur) => acc + cur, 0);

  if (isNaN(result)) {
    throw new Error('사용자 입력을 다시 하세요.');
  }

  return result;
}
```

###### 테스트 케이스

1. **입력**: `1,2:3`

- 처리 : 구분자를 기준으로 `1`,`2`,`3`으로 분리
- 결과 : 6

#### 커스텀 구분자

- 커스텀 구분자는 **입력 문자열의 첫 부분**에 `//`와 `\n` 사이에 정의된 문자이다.
- 예를 들어 `//;\n1;2;3`의 경우, 커스텀 구분자 `;`를 기준으로 숫자를 분리하고 합산한다.

##### 코드 예시

```
function getCustomSeparator(userInput) {
  const customSeparator = userInput.match(/^\/\/(\D)\\n/);

  return Array.isArray(customSeparator) && customSeparator.length
    ? customSeparator[1]
    : null;
}
```

##### 테스트 케이스

1. **입력**: `//|\n4|5|6`

   - 처리: 커스텀 구분자 `|`를 기준으로 `4,`5`,`6`으로 분리
   - 결과: 15

2. **입력**: `//.\n7.8.9`
   - 처리: 커스텀 구분자 `.`를 기준으로 `7`,`8,`9`으로 분리
   - 결과: 24

#### 예외 처리

- 유효하지 않은 입력이 들어올 경우, `[ERROR] 사용자 입력을 다시 하세요.`라는 메시지와 함께 오류가 발생한다.
- `잘못된 구분자나 숫자가 아닌 문자가 포함된 경우` 오류가 발생하며, **프로그램이 종료**된다.
- `NaN` 값이 발생하는 경우에도 예외를 던진다.

##### 코드 예시

```
if (!formattedUserInput.match(regex)) {
  throw new Error('사용자 입력을 다시 하세요.');
}
```

```
if (isNaN(result)) {
  throw new Error('사용자 입력을 다시 하세요.');
}
```

###### 테스트 케이스

1. **입력**: `1,,2,3`

   - 처리: **연속 구분자 오류**
   - 결과: `[ERROR] 사용자 입력을 다시 하세요.`

2. **입력**: `//;\n1;2;;3`

   - 처리: **[커스텀 구분자] 연속 구분자 오류**
   - 결과: `[ERROR] 사용자 입력을 다시 하세요.`

3. **입력**: `1,2:abc`

   - 처리: **숫자가 아닌 값 포함**
   - 결과: `[ERROR] 사용자 입력을 다시 하세요.`

4. **입력**: `//|\n1|2|abc` (숫자가 아닌 값 포함)
   - 처리: **[커스텀 구분자] 숫자가 아닌 값 포함**
   - 결과: `[ERROR] 사용자 입력을 다시 하세요.`

---

## 📄 테스트(Testing)

- 단위 테스트를 통해 예외 상황을 검증하였습니다.
- `Jest`를 사용
