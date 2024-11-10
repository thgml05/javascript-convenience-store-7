import FileHandler from '../file-handler/FileHandler.js';

class StockManager {
  #products = [];

  async loadProducts() {
    this.#products = await FileHandler.fileToObj('products.md');
  }

  get products() {
    return this.#products;
  }
}

export default StockManager;
