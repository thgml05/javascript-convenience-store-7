import { MissionUtils } from '@woowacourse/mission-utils';

const Receipt = {
  printReceipt(
    items,
    realQuantity,
    promotionDiscount,
    beforeTotalPrice,
    membershipDiscount
  ) {
    const realTotalPrice =
      beforeTotalPrice - promotionDiscount - membershipDiscount;
    MissionUtils.Console.print('==============W 편의점================');
    MissionUtils.Console.print(this.formatLine('상품명', '수량', '금액'));
    for (const item of items) {
      MissionUtils.Console.print(
        this.formatLine(item.name, item.quantity, item.price)
      );
    }
    MissionUtils.Console.print('=============증	    정===============');
    for (const item of items) {
      if (item.promotionName !== null && item.promotionQuantity !== 0) {
        MissionUtils.Console.print(
          this.formatLine(item.name, item.promotionQuantity, '')
        );
      }
    }
    MissionUtils.Console.print('====================================');
    MissionUtils.Console.print(
      this.formatLine('총구매액', realQuantity, beforeTotalPrice)
    );
    MissionUtils.Console.print(
      this.formatLine('행사할인', '', `-${promotionDiscount.toLocaleString()}`)
    );
    MissionUtils.Console.print(
      this.formatLine(
        '멤버십할인',
        '',
        `-${membershipDiscount.toLocaleString()}`
      )
    );
    MissionUtils.Console.print(
      this.formatLine('내실돈', '', `${realTotalPrice.toLocaleString()}`)
    );
  },

  formatLine(name, quantity = '', price = '') {
    const nameColumn = name.padEnd(16, ' ');
    const quantityColumn = String(quantity).padEnd(5, ' ');
    const priceColumn = String(price).padStart(10);
    return `${nameColumn.toLocaleString()} ${quantityColumn.toLocaleString()} ${priceColumn.toLocaleString()}`;
  },
};

export default Receipt;
