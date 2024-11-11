import InputView from '../io/InputView.js';

const Membership = {
  async isMembership() {
    if ((await InputView.askMembership()) === 'Y') return true;
    return false;
  },

  getDiscountAmount(totalPrice) {
    const discountAmount = totalPrice * 0.3;
    if (discountAmount > 8000) return 8000;
    else return discountAmount;
  },
};

export default Membership;
