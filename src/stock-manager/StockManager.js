import FileHandler from '../file-handler/FileHandler.js';

class StockManager {
  #products;

  constructor() {
    this.#products = [];
  }

  async loadProducts() {
    this.#products = await FileHandler.fileToObj('products.md');
  }

  get products() {
    return this.#products;
  }

  validatePurchase(items) {
    for (const item of items) {
      const products = this.#products.filter(
        (product) => product.name === item.name
      );
      this.checkItemExist(products);
      this.checkItemQuantity(products, item);
    }
  }

  checkItemExist(products) {
    if (products.length === 0)
      throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
  }

  checkItemQuantity(products, item) {
    const totalQuantity = this.calculateTotalQuantity(products);
    if (totalQuantity < item.quantity)
      throw new Error(
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
      );
  }

  calculateTotalQuantity(products) {
    let normalQuantity = 0;
    let promotionQuantity = 0;

    products.forEach((product) => {
      if (product.promotion) promotionQuantity += product.quantity;
      else normalQuantity += product.quantity;
    });

    return normalQuantity + promotionQuantity;
  }

  getPromotionProduct(item) {
    return this.#products.find(
      (product) => product.name === item.name && product.promotion
    );
  }

  addPriceToItems(items) {
    let updatedItems = [];
    for (const item of items) {
      let product = this.#products.find(
        (product) => product.name === item.name
      );
      updatedItems.push({ ...item, price: product.price });
    }
    return updatedItems;
  }
}

export default StockManager;
