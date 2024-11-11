import { MissionUtils } from '@woowacourse/mission-utils';

const PRODUCT_QUANTITY_INPUT_REGEX =
  /^\[([가-힣]+)-\d+\](,\[([가-힣]+)-\d+\])*$/;
const ANSWER_REGEX = /^[YN]$/;

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

  async askPromotion(itemName) {
    while (true) {
      try {
        let answer = await MissionUtils.Console.readLineAsync(
          `\n현재 ${itemName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`
        );
        this.isAnswerValidate(answer);
        return answer;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  },

  async askNormalCount(itemName, normalCount) {
    while (true) {
      try {
        let answer = await MissionUtils.Console.readLineAsync(
          `\n현재 ${itemName} ${normalCount}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`
        );
        this.isAnswerValidate(answer);
        return answer;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  },

  // async askMembership() {
  //   while (true) {
  //     try {
  //       let answer = await MissionUtils.Console.readLineAsync(
  //         `\n멤버십 할인을 받으시겠습니까? (Y/N)\n`
  //       );
  //       this.isAnswerValidate(answer);
  //       return answer;
  //     } catch (error) {
  //       MissionUtils.Console.print(error.message);
  //     }
  //   }
  // },

  isAnswerValidate(answer) {
    if (!ANSWER_REGEX.test(answer))
      throw new Error('[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.');
  },
};

export default InputView;
