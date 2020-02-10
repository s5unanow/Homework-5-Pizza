const SITE_VIEW_STYLE = {
  TABLE: "table",
  LIST: "list"
};
const FILTER_VIEW_TYPES = {
  INGREDIENTS: "ingredients",
  CALORIES: "calories"
};

class Utils {
  static getBody () {
    return document.querySelector("body");
  }
}

class SiteBuilder {
  constructor(siteComponents) {
    this.components = siteComponents.getComponents();
    this.viewStyle = {};
    this.initialiseViewStyle();
  }
  initialiseViewStyle(state = SITE_VIEW_STYLE.TABLE) {
    for (let state of SITE_VIEW_STYLE) {
      this.viewStyle[state] = false;
    }
  }
  setViewStyle(newStyle) {
    if (newStyle) {
      for (let state of this.viewStyle) {
        this.viewStyle[state] = newStyle === state;
      }
    }
  }
  buildAll() {

  }
  buildListStyle() {
    this.components.forEach(component => {
      if (component.hasLayoutStyle) component.setListStyle().build();
      else component.build();
    });
  }
  buildTableStyle() {
    this.components.forEach(component => {
      if (component.hasLayoutStyle) component.setTableStyle().build();
      else component.build();
    });
  }
}

class Filter {

}

class Controller {

}

class Item {
  constructor(name, price, ingredients) {
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
  }
  ingredientsList() {
    return this.ingredients.reduce((list, ingredient) => {
      return list + " " + ingredient;
    }, "");
  }
}

class Pizza extends Item {
  constructor(name, price, ingredients) {
    super(name, price, ingredients);

  }
}

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

