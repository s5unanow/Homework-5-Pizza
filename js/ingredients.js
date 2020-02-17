class Ingredient {
  constructor(name, id, calories, price, quantity = 1) {
    this.id = id;
    this.name = name;
    this.singlePrice = price;
    this.singleCalories = calories;
    this.quantity = quantity;
    this.calories;
    this.price;
  }
  get price() {
    return this.singlePrice * this.quantity
  }
  get calories() {
    return this.singleCalories * this.quantity
  }
  static create(ingredientID) {
    if (ingredientID === "fish") return new Ingredient("рыба", ingredientID, 40, 100);
    if (ingredientID === "chicken") return new Ingredient("курица", ingredientID, 62, 70);
    if (ingredientID === "salami") return new Ingredient("салями", ingredientID, 100, 70);
    if (ingredientID === "mushrooms") return new Ingredient("грибы", ingredientID, 30, 15);
    if (ingredientID === "asparagus") return new Ingredient("спаржа", ingredientID, 10, 10);
    if (ingredientID === "tomatoes") return new Ingredient("помидоры", ingredientID, 10, 5);
    if (ingredientID === "mozzarella") return new Ingredient("моцарелла", ingredientID, 70, 50);
    if (ingredientID === "goose") return new Ingredient("жёпка гуся", ingredientID, 190, 170);
    if (ingredientID === "olive") return new Ingredient("оливки", ingredientID, 30, 10);
    if (ingredientID === "cheese") return new Ingredient("сыр", ingredientID, 30, 15);
  }
}

const allIngredientsMap = new Map();
allIngredientsMap.set("fish", "рыба");
allIngredientsMap.set("chicken", "курица");
allIngredientsMap.set("salami", "салями");
allIngredientsMap.set("mushrooms", "грибы");
allIngredientsMap.set("asparagus", "спаржа");
allIngredientsMap.set("tomatoes", "помидоры");
allIngredientsMap.set("mozzarella", "моцарелла");
allIngredientsMap.set("goose", "жёпка гуся");
allIngredientsMap.set("olive", "оливки");
allIngredientsMap.set("cheese", "сыр");