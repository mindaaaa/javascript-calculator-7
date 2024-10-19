import { Console } from '@woowacourse/mission-utils';

// 1. 사용자의 입력을 받음
async function getString() {
  const inputString = await Console.readLineAsync(
    '덧셈할 문자열을 입력해 주세요.\n'
  );
  return inputString;
}

// 4. 유효한 입력인지 확인
function vaildateInput(inputString, customString) {
  let regex;
  if (customString) {
    regex = new RegExp(
      `(\/\/${customString}\\n)?(\s|((\d+[:,${customString}]?)+(\d+))+$)` // 여기 제대로 안됨
    );
    if (inputString.match(regex)) {
      console.log('커스텀 구분자');
      return inputString;
    } else {
      throw new Error('[ERROR]');
    }
  } else {
    regex = /\s|(\d+(([:,]\d+)+)?)$/;
    if (inputString.match(regex)) {
      console.log('그냥');
      return inputString;
    } else {
      throw new Error('[ERROR]');
    }
  }
}

// 3. 커스텀구분자를 설정하는 기능
function customSeparator(inputString) {
  const regex = /^(\/\/\D\\n)/;
  const customString = inputString.match(regex);

  return customString ? customString[1] : null;
}

// 2. :나 , 커스텀 구분자로 구분된 문자열의 합 반환
function computeResult(inputString, customString) {
  let regex;
  let formattedInput;
  if (customString) {
    regex = new RegExp(`[\\n:,${customString}]`);
    formattedInput = inputString.toString().replace(/^(?:\/\/)(\D)(?:\\n)/, ''); // 숫자만 남기기
  } else {
    regex = /[:,]/;
    formattedInput = inputString.toString();
  }
  const splitString = formattedInput.split(regex);
  console.log(splitString); // ERROR 처리를 위한 확인

  const stringToNumber = splitString.map(Number);
  const compute = stringToNumber.reduce((acc, cur) => {
    return acc + cur;
  });

  return compute;
}

class App {
  async run() {
    const inputString = await getString();
    try {
      // 유효한 입력인지 확인
      vaildateInput(inputString);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    // 커스텀연산자가 있는지 확인
    const customString = customSeparator(inputString);
    console.log(customString);

    const computeReturn = computeResult(inputString, customString);
    Console.print(`결과 : ${computeReturn}`);
  }
}

export default App;
