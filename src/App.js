import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from './io/InputView.js';
import OutputView from './io/OutputView.js';
import StockManager from './stock-manager/StockManager.js';
import PromotionManager from './promotion-manager/PromotionManager.js';
import PaymentCalculator from './payment-calculator.js/PaymentCalculator.js';
import Membership from './membership/Membership.js';
import Receipt from './receipt/Receipt.js';

class App {
  async run() {
    const stockManager = await this.getStockManager();
    const promotionManager = await this.getPromotionManager(stockManager);
    while (true) {
      OutputView.printProducts(stockManager.products);
      let items = await this.requestItems(stockManager);

      items = await this.getPromotionCheckedItems(
        items,
        stockManager,
        promotionManager
      );

      const realQuantity = PaymentCalculator.getRealQuantity(items);
      const promotionDiscount = PaymentCalculator.getPromotionDiscount(items);
      const beforeTotalPrice =
        PaymentCalculator.getBeforePromotionTotalPrice(items);
      const normalProductTotalPrice =
        PaymentCalculator.getNormalProductTotalPrice(items);

      let membershipDiscount = 0;
      if (await Membership.isMembership()) {
        membershipDiscount = Membership.getDiscountAmount(
          normalProductTotalPrice
        );
      }

      Receipt.printReceipt(
        items,
        realQuantity,
        promotionDiscount,
        beforeTotalPrice,
        membershipDiscount
      );

      stockManager.deduction(items);

      const re = await InputView.getRePurchase();
      if (re === 'N') return;
    }
  }

  async getStockManager() {
    const stockManager = new StockManager();
    await stockManager.loadProducts();
    return stockManager;
  }

  async getPromotionManager(stockManager) {
    const promotionManager = new PromotionManager(stockManager);
    await promotionManager.loadPromotions();
    return promotionManager;
  }

  async requestItems(stockManager) {
    while (true) {
      try {
        let items = await InputView.readItems();
        stockManager.validatePurchase(items);
        items = stockManager.addPriceToItems(items);
        return items;
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  async getPromotionCheckedItems(items, products, promotionManager) {
    let promotionCheckedItems = [];
    for (const item of items) {
      let promotionInitItem = promotionManager.initPromotionToItem(item);
      if (promotionInitItem.promotionName === null) {
        promotionCheckedItems.push(promotionInitItem);
        break;
      }

      const promotionCheckedItem = await promotionManager.isPromotion(
        promotionInitItem
      );

      let modifiedItem = await promotionManager.checkStock(
        promotionCheckedItem,
        products
      );
      promotionCheckedItems.push(modifiedItem);
    }
    return promotionCheckedItems;
  }
}

export default App;
