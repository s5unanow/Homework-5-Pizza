class Ingredient {
  constructor(name, id, calories, price) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.price = price;
  }
  calcPrice(portions) {
    return this.price * portions
  }
}

const fish = new Ingredient("рыба", "fish" , 200, 100);
const chicken = new Ingredient("курица", "chicken" , 420, 70);
const salami = new Ingredient("салями", "salami" , 50, 70);
const mushrooms = new Ingredient("грибы", "mushrooms" , 30, 15);
const asparagus = new Ingredient("спаржа", "asparagus" , 10, 10);
const tomatoes = new Ingredient("помидоры", "tomatoes" , 10, 5);
const mozzarella = new Ingredient("моцарелла", "mozzarella" , 70, 50);
const goose = new Ingredient("жёпка гуся", "goose" , 700, 170);
const olive = new Ingredient("оливки", "olive" , 30, 10);