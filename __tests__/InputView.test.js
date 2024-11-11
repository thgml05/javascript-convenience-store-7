import InputView from '../src/io/InputView.js';

test('구매할 상품 및 수량 입력 예외 테스트', () => {
  expect(() => {
    InputView.inputValidate('[사이다 2],[컵라면-1]');
  }).toThrow('[ERROR]');
});

test('Y/N 답변 입력 예외 테스트', () => {
  expect(() => {
    InputView.isAnswerValidate('d');
  }).toThrow('[ERROR]');
});
