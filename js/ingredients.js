class Ingredient {
  constructor(name, calories, price) {
    this.name = name;
    this.calories = calories;
    this.price = price;
  }
  calcPrice(portions) {
    return this.price * portions
  }
}

const fish = new Ingredient("рыба", 200, 100);
const chicken = new Ingredient("курица", 420, 70);
const salami = new Ingredient("салями", 50, 70);
const mushrooms = new Ingredient("грибы", 30, 15);
const asparagus = new Ingredient("спаржа", 10, 10);
const tomatoes = new Ingredient("помидоры", 10, 5);
const mozzarella = new Ingredient("моцарелла", 70, 50);
const goose = new Ingredient("жёпка гуся", 700, 170);
const olive = new Ingredient("оливки", 30, 10);