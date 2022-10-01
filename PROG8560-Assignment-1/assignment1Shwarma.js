const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  ITEM_1: Symbol("item_1"),
  SIZE_1: Symbol("size_1"),
  ITEM_2: Symbol("item_2"),
  SIZE_2: Symbol("size_2"),
  TOPPINGS: Symbol("toppings"),
  DRINKS: Symbol("drinks"),
  TYPE: Symbol("1"),
  SAUCE: Symbol("TOMATO"),
});

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize1 = "";
    this.sSize2 = "";
    this.sToppings = "";
    this.sSauce = "";
    this.sDrinks = "";
    this.sItem1 = "";
    this.sItem2 = "";
    this.allOrder = "";
  }

  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.TYPE;
        aReturn.push("Welcome to LinWang's Pasta shop.");
        aReturn.push("Please type 1 for pasta, 2 for fried chicken");
        break;
      case OrderState.TYPE:
        if (sInput == 1) {
          this.stateCur = OrderState.SIZE_1;
          this.sItem1 = "pasta";
          aReturn.push("what size pasta would you like");
        } else {
          this.stateCur = OrderState.SIZE_2;
          this.sItem2 = "fried chicken";
          aReturn.push("what size fried chicken would you like");
        }
        break;
      case OrderState.SIZE_1:
        this.stateCur = OrderState.TOPPINGS;
        this.sSize1 = sInput;
        aReturn.push("what seasonings would you like to add in your pasta?");
        break;
      case OrderState.SIZE_2:
        this.stateCur = OrderState.SAUCE;
        this.sSize2 = sInput;
        aReturn.push("What SAUCE would you like for your fried chicken?");
        break;
      case OrderState.TOPPINGS:
        this.stateCur = OrderState.DRINKS;
        this.sToppings = sInput;
        this.allOrder +=
          this.sSize1 + "  " + this.sItem1 + " with " + this.sToppings;
        aReturn.push(
          "Would you like drinks with that?(type 'no' if you don't want)"
        );
        break;
      case OrderState.SAUCE:
        this.stateCur = OrderState.DRINKS;
        this.sSauce = sInput;
        this.allOrder +=
          this.sSize2 + "  " + this.sItem2 + " with " + this.sSauce;
        aReturn.push(
          "Would you like drinks with that?(type 'no' if you don't want)"
        );
        break;
      case OrderState.DRINKS:
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
          this.allOrder += " and " + this.sDrinks + ";\n";
        }
        this.stateCur = OrderState.CONTINUE;
        aReturn.push("Please type Y to order more, N to submit your order");
        break;
      case OrderState.CONTINUE:
        if (sInput.toLowerCase() == "y") {
          this.stateCur = OrderState.TYPE;
          aReturn.push("Please type 1 for pasta, 2 for fried chicken");
        } else {
          this.isDone(true);
          aReturn.push("Thank-you for your order of");
          aReturn.push(this.allOrder);
          let d = new Date();
          d.setMinutes(d.getMinutes() + 20);
          aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        }
        break;
    }
    return aReturn;
  }
};
