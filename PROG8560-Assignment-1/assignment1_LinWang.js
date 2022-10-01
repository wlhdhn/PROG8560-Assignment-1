const Order = require("./assignment1Order");
const taxRate = 0.13;
const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  ITEM_1: Symbol("item_1"),
  SIZE_1: Symbol("size_1"),
  ITEM_2: Symbol("item_2"),
  SIZE_2: Symbol("size_2"),
  SEASONINGS: Symbol("seasonings"),
  SOUPS: Symbol("soups"),
  BEVERAGES: Symbol("beverages"),
  TYPE: Symbol("1"),
  SAUCE: Symbol("TOMATO"),
});

module.exports = class LinWangOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize1 = "";
    this.sSize2 = "";
    this.sSeasonings = "";
    this.sSauce = "";
    this.sSoups = "";
    this.sBeverages = "";
    this.sItem1 = "";
    this.sItem2 = "";
    this.allOrder = "";
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    
  }

  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.TYPE;
        aReturn.push("Welcome to LinW's Pasta shop.");
        aReturn.push("Please type 1 for pasta, 2 for fried chicken");
        break;
      case OrderState.TYPE:
        if (sInput == 1) {
          this.stateCur = OrderState.SIZE_1;
          this.sItem1 = "pasta";
          aReturn.push(
            "what size pasta would you like? big($10), medium($8), small($5)"
          );
        } else {
          this.stateCur = OrderState.SIZE_2;
          this.sItem2 = "fried chicken";
          aReturn.push(
            "what size fried chicken would you like? big($7), medium($4), small($2)"
          );
        }
        break;
      case OrderState.SIZE_1:
        this.stateCur = OrderState.SEASONINGS;
        this.sSize1 = sInput;
        if (sInput.toLowerCase() == "big") {
          this.subTotal += 10;
        } else if (sInput.toLowerCase() == "medium") {
          this.subTotal += 8;
        } else {
          this.subTotal += 5;
        }
        aReturn.push("what seasonings would you like to add in your pasta?");
        break;
      case OrderState.SIZE_2:
        this.stateCur = OrderState.SAUCE;
        this.sSize2 = sInput;
        if (sInput.toLowerCase() == "big") {
          this.subTotal += 7;
        } else if (sInput.toLowerCase() == "medium") {
          this.subTotal += 4;
        } else {
          this.subTotal += 2;
        }
        aReturn.push("What sauce would you like for your fried chicken?");
        break;
      case OrderState.SEASONINGS:
        this.stateCur = OrderState.SOUPS;
        this.sSeasonings = sInput;
        this.allOrder +=
          this.sSize1 + "  " + this.sItem1 + " with " + this.sSeasonings;
        aReturn.push(
          "Would you like soups with that?($3/each)(type 'no' if you don't want)"
        );
        break;
      case OrderState.SAUCE:
        this.stateCur = OrderState.BEVERAGES;
        this.sSauce = sInput;
        this.allOrder +=
          this.sSize2 + "  " + this.sItem2 + " with " + this.sSauce;
        aReturn.push(
          "Would you like beverages with that?($3/each)(type 'no' if you don't want)"
        );
        break;
      case OrderState.SOUPS:
        if (sInput.toLowerCase() != "no") {
          this.sSoups = sInput;
          this.subTotal += 3;
          this.allOrder += " and " + this.sSoups + ";\n";
        }
        this.stateCur = OrderState.CONTINUE;
        aReturn.push("Please type Y to order more, N to submit your order");
        break;
      case OrderState.BEVERAGES:
        if (sInput.toLowerCase() != "no") {
          this.sBeverages = sInput;
          this.subTotal += 3;
          this.allOrder += " and " + this.sBeverages + ";\n";
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
          this.tax = this.subTotal * taxRate;
          this.total = this.subTotal + this.tax;
          aReturn.push("Thank you for your order of");
          aReturn.push(this.allOrder);
          aReturn.push(
            `The food price :${this.subTotal.toFixed(
              2
            )}\nThe food tax :${this.tax.toFixed(
              2
            )}\nThe total price :${this.total.toFixed(2)}`
          );
          let d = new Date();
          d.setMinutes(d.getMinutes() + 20);
          aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        }
        break;
    }
    return aReturn;
  }
};
