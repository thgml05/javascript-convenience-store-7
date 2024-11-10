import { MissionUtils } from '@woowacourse/mission-utils';

const PRODUCT_QUANTITY_INPUT_REGEX =
  /^\[([가-힣]+)-\d+\](,\[([가-힣]+)-\d+\])*$/;

const InputView = {
  async readItems() {
    while (true) {
      try {
        const items = (await this.inputItems()).trim();
        this.inputValidate(items);
        return this.inputToObj(items);
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  },

  async inputItems() {
    return await MissionUtils.Console.readLineAsync(
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n'
    );
  },

  inputValidate(input) {
    if (!PRODUCT_QUANTITY_INPUT_REGEX.test(input))
      throw new Error(
        '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.'
      );
  },

  inputToObj(input) {
    const items = input.split(',').map((item) => {
      const [name, quantity] = item.substring(1, item.length - 1).split('-');
      return {
        name: name,
        quantity: parseInt(quantity),
      };
    });
    return items;
  },
};

export default InputView;
