class Item {
  constructor(name, basePrice, ...ingredients) {
    this.name = name;
    this.basePrice = basePrice;
    this.ingredients = ingredients[0];
    this.baseCalories = 300;
    this.price = this.calcPrice();
    this.calories = this.calcCalories();
  }
  ingredientsList() {
    return this.ingredients.map(ingredient => ingredient.name).join(", ") + ".";
  }
  calcPrice() {
    return this.basePrice + this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);
  }
  calcCalories() {
    return this.baseCalories + this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.calories;
    }, 0);
  }
}

class Pizza extends Item {
  constructor(name, basePrice, ...ingredients) {
    super(name, basePrice, ingredients);
  }
}

const feliche = new Pizza("Феличе", 30, fish, mushrooms, tomatoes, olive);
const margarita = new Pizza("Маргарита", 30, fish, mushrooms, tomatoes);
const fungi = new Pizza("Фунги", 30, chicken, salami, mushrooms, tomatoes);
const shpinato = new Pizza("Шпинато", 30, chicken, asparagus, mozzarella);
const djovano = new Pizza("Джовано", 30, chicken, tomatoes, olive);
const kaprichosa = new Pizza("Капричоза", 30, chicken, mushrooms, mozzarella);
const leonardo = new Pizza("Леонардо", 30, salami, mozzarella, olive);
const corleone = new Pizza("Корлеоне", 30, fish, mushrooms, mozzarella, goose);
const peperochino = new Pizza("Пеперончино", 30, chicken, goose);
const tropikana = new Pizza("Тропикана", 30, salami, mozzarella);
const grudo = new Pizza("Поло-Грудо", 30, fish, mushrooms, asparagus);
const toskana = new Pizza("Тоскана", 30, salami, tomatoes, olive);
const sciliana = new Pizza("Сицилиана", 30, salami, tomatoes, olive);
const fattoria = new Pizza("Фаттория", 30, chicken, mushrooms, mozzarella);
const cardinale = new Pizza("Кардинале", 30, fish, tomatoes, goose);
const kaza = new Pizza("Каза", 30, chicken, salami, asparagus, tomatoes, mozzarella);

const items = [feliche, margarita, fungi, shpinato, djovano, kaprichosa, leonardo, corleone,
  peperochino, tropikana, grudo, toskana, sciliana, fattoria, cardinale, kaza];