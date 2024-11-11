import { MissionUtils } from '@woowacourse/mission-utils';
import FileHandler from '../file-handler/FileHandler.js';
import InputView from '../io/InputView.js';

const CARBONATED_PROMO_2_PLUS_1 = '탄산2+1';
const PROMO_2_PLUS_1_DIVISOR = 3;
const PROMO_1_PLUS_1_DIVISOR = 3;

class PromotionManager {
  #promotions;

  constructor(stockManager) {
    this.#promotions = [];
    this.stockManager = stockManager;
  }

  async loadPromotions() {
    this.#promotions = await FileHandler.fileToObj('promotions.md');
  }

  initPromotionToItem(item) {
    const product = this.stockManager.getPromotionProduct(item);
    if (product === undefined)
      return { ...item, promotionName: null, promotionQuantity: null };
    return {
      ...item,
      promotionName: product.promotion,
      promotionQuantity: null,
    };
  }

  async isPromotion(item) {
    const product = this.stockManager.getPromotionProduct(item);

    const promotion = this.getPromotion(product);
    if (!this.isValuableDate(promotion)) return item;

    return await this.checkPromotion(item, promotion, product);
  }

  getPromotion(product) {
    return this.#promotions.find(
      (promotion) => promotion.name === product.promotion
    );
  }

  isValuableDate(promotion) {
    const nowDate = MissionUtils.DateTimes.now();
    if (
      nowDate >= new Date(promotion.start_date) &&
      nowDate <= new Date(promotion.end_date)
    )
      return true;
    return false;
  }

  checkPromotion(item, promotion, product) {
    if (promotion.name === CARBONATED_PROMO_2_PLUS_1) {
      return this.twoPlusOnePromotion(item, promotion, product);
    }
    return this.onePlusOnePromotion(item, promotion, product);
  }

  async onePlusOnePromotion(item, promotion, product) {
    if (item.quantity >= product.quantity || item.quantity % 2 === 0) {
      return {
        ...item,
        promotionQuantity: parseInt(item.quantity / 2),
      };
    }
    return await this.askPromotionOnePlusOne(item, promotion);
  }

  async twoPlusOnePromotion(item, promotion, product) {
    if (item.quantity === 1) return item;
    if (item.quantity < product.quantity && item.quantity % 3 === 2)
      return await this.askPromotionTwoPlusOne(item, promotion);
    return {
      ...item,
      promotionQuantity: parseInt(item.quantity / 3),
    };
  }

  async askPromotionOnePlusOne(item) {
    const answer = await InputView.askPromotion(item.name);
    if (answer === 'Y')
      return {
        ...item,
        quantity: item.quantity + 1,
        promotionQuantity: parseInt((item.quantity + 1) / 2),
      };
    else if (answer === 'N')
      return {
        ...item,
        promotionQuantity: parseInt(item.quantity / 2),
      };
  }

  async askPromotionTwoPlusOne(item) {
    const answer = await InputView.askPromotion(item.name);
    if (answer === 'Y')
      return {
        ...item,
        quantity: item.quantity + 1,
        promotionQuantity: parseInt((item.quantity + 1) / 3),
      };
    else if (answer === 'N')
      return {
        ...item,
        promotionQuantity: parseInt(item.quantity / 3),
      };
  }

  async checkStock(item) {
    const product = this.stockManager.getPromotionProduct(item);

    if (product.quantity < item.quantity) {
      return await this.modifyItem(item, product);
    }
    return item;
  }

  async modifyItem(item, product) {
    let modifyItem;
    let normalCount;
    if (item.promotionName === '탄산2+1') {
      modifyItem = this.modifyTwoPlusOneQauntity(item, product.quantity);
      normalCount = modifyItem.quantity - modifyItem.promotionQuantity * 3;
    } else {
      modifyItem = this.modifyOnePlusOneQauntity(item, product.quantity);
      normalCount = modifyItem.quantity - modifyItem.promotionQuantity * 2;
    }
    return await this.askPromotionNormalCount(modifyItem, normalCount);
  }

  modifyOnePlusOneQauntity(item, stockQuantity) {
    return {
      ...item,
      promotionQuantity: parseInt(stockQuantity / 2),
    };
  }

  modifyTwoPlusOneQauntity(item, stockQuantity) {
    return {
      ...item,
      promotionQuantity: parseInt(stockQuantity / 3),
    };
  }

  async askPromotionNormalCount(modifyItem, normalCount) {
    const answer = await InputView.askNormalCount(modifyItem.name, normalCount);
    if (answer === 'Y') {
      return modifyItem;
    } else if (answer === 'N') {
      return {
        ...modifyItem,
        quantity: modifyItem.quantity - normalCount,
      };
    }
  }
}

export default PromotionManager;
