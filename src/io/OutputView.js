import { MissionUtils } from '@woowacourse/mission-utils';

const OutputView = {
  printProducts(products) {
    MissionUtils.Console.print('안녕하세요. W편의점입니다.');
    MissionUtils.Console.print('현재 보유하고 있는 상품입니다.');
    this.printNewLine();
    this.showFormattedStockList(products);
    this.printNewLine();
  },

  printNewLine() {
    MissionUtils.Console.print('');
  },

  showFormattedStockList(products) {
    for (const product of products) {
      const quantityText = this.getQuantityText(product);
      const promotionText = this.getPromotionText(product);
      let formattedProduct = `- ${
        product.name
      } ${product.price.toLocaleString()}원 ${quantityText} ${promotionText}`;
      MissionUtils.Console.print(formattedProduct);
    }
  },

  getQuantityText(product) {
    if (product.quantity === 0) {
      return '재고 없음';
    }
    return `${product.quantity}개`;
  },

  getPromotionText(product) {
    if (product.promotion !== null) {
      return `${product.promotion}`;
    }
    return '';
  },
};

export default OutputView;
