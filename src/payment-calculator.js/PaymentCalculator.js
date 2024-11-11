class PaymentCalculator {
  constructor(items) {
    this.realQuantity = this.getRealQuantity(items);
    this.promotionDiscount = this.getPromotionDiscount(items);
    this.beforeTotalPrice = this.getBeforePromotionTotalPrice(items);
    this.normalProductTotalPrice = this.getNormalProductTotalPrice(items);
  }

  getRealQuantity(items) {
    let realQuantity = 0;

    for (const item of items) {
      realQuantity += item.quantity;
    }
    return realQuantity;
  }

  getPromotionDiscount(items) {
    let promotionDiscount = 0;
    for (const item of items) {
      promotionDiscount += item.promotionQuantity * item.price;
    }
    return promotionDiscount;
  }

  getBeforePromotionTotalPrice(items) {
    let price = 0;
    for (const item of items) {
      price += item.quantity * item.price;
    }
    return price;
  }

  getNormalProductTotalPrice(items) {
    let price = 0;
    for (const item of items) {
      if (item.promotionName === null) {
        price += item.price * item.quantity;
      }
    }
    return price;
  }
}

export default PaymentCalculator;
