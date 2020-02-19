"use strict";

class Item {
  constructor({ id, name, basePrice = 30, ingredients, baseCalories = 300 }) {
    this.id = id;
    this.name = name;
    this.basePrice = basePrice;
    this.ingredients = this.composeIngredients(ingredients);
    this.baseCalories = baseCalories;
    this.price;
    this.calories;
  }
  composeIngredients(ingredients) {
    return ingredients.sort().map(ingredientID => Ingredient.create(ingredientID))
  }
  ingredientsList() {
    return this.ingredients.map(ingredient => ingredient.name).join(", ") + ".";
  }
  ingredientsIDArray() {
    return this.ingredients.map(ingredient => ingredient.id);
  }
  get price() {
    return this.basePrice + this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);
  }
  get calories() {
    return this.baseCalories + this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.calories;
    }, 0);
  }
  includesIngredient(ingredientID) {
    return this.ingredients.some(ingredient => ingredient.id === ingredientID);
  }
  addIngredient(ingredientID) {
    this.ingredients.push(Ingredient.create(ingredientID));
  }
  updateIngredientQuantity(ingredientID, quantity) {
    this.ingredients.forEach(ingredient => {
      if (ingredient.id === ingredientID) ingredient.quantity = quantity
    })
  }
  removeIngredient(ingredientID) {
    this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== ingredientID)
  }
}

class Pizza extends Item {
  constructor({ id, name, basePrice, ingredients, baseCalories }) {
    super({ id, name, basePrice, ingredients, baseCalories });
  }
  static createPizzaFromStorage(itemData) {
    let ingredients = [];
    for (let ingredient of itemData.ingredients) {
      ingredients.push(ingredient.id);
    }
    let pizza =  new Pizza({id: itemData.id, name: itemData.name, ingredients: ingredients });
    pizza.ingredients.forEach(ingredient => {
      let quantity = itemData.ingredients.filter(dataIngredient => dataIngredient.id === ingredient.id)[0].quantity;
      pizza.updateIngredientQuantity(ingredient.id, quantity)
    });
    return pizza
  }
}

let items, itemsData;

let xmlRequest = new XMLHttpRequest();
xmlRequest.open("GET", "js/items.json", false);
xmlRequest.addEventListener("load", event => {
  let response = event.target.responseText;
  itemsData = JSON.parse(response);
});
xmlRequest.send();


if (itemsData) {
  items = itemsData.map(rawItem => new Pizza(rawItem));
}