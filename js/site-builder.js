const SITE_VIEW_STYLE = {
  TABLE: "table",
  LIST: "list"
};
const FILTER_VIEW_TYPES = {
  INGREDIENTS: "ingredients",
  CALORIES: "calories"
};
const SORT_VIEW_TYPES = {
  ASC: "ascending",
  DESC: "descending",
  NONE: "none"
};

class Utils {
  static getBody () {
    return document.querySelector("body");
  }
}

class SiteBuilder {
  constructor(siteComponents) {
    this.components = siteComponents.getComponents();
  }
  static initialize() {
    let body = Utils.getBody();
    body.innerHTML = initialState;
  }
  buildDefaultLayout() {

  }
  buildTableStyle() {
    this.clearBody();
    console.log(this.components);
    this.components.forEach(component => {
      if (component.hasLayoutStyle) component.setTableStyle().build();
      else component.build();
    });
  }
  buildListStyle() {
    this.clearBody();
    this.components.forEach(component => {
      if (component.hasLayoutStyle) component.setListStyle().build();
      else component.build();
    });
  }
  clearBody() {
    let body = Utils.getBody();
    body.innerHTML = `
    <div class="page-wrapper">
      <div class="page-wrapper__inner container">
      </div>
    </div>`;
  }
}

class Filter {
  constructor() {
    this.filtered = false;
    this.ingredients = [];
    this.calories = [];
  }
}

class Sorter{
  constructor() {
    this.byName = SORT_VIEW_TYPES.ASC;
    this.byPrice = SORT_VIEW_TYPES.NONE;
  }
  setSortByName(type) {
    if (Object.values(SORT_VIEW_TYPES).includes(type)) {
      this.byName = type;
    }
  }
  setSortByPrice(type) {
    if (Object.values(SORT_VIEW_TYPES).includes(type)) {
      this.byPrice = type;
    }
  }
}

class Controller {
  constructor(siteBuilder, filter, sorter) {
    this.viewStyle = {};
    this.initialiseViewStyle();
    this.siteBuilder = siteBuilder;
    this.filter = filter;
    this.sorter = sorter;
  }
  initialiseViewStyle() {
    for (let state in SITE_VIEW_STYLE) {
      this.viewStyle[SITE_VIEW_STYLE[state]] = false;
    }
    console.log(this.viewStyle);
  }
  initializeView(style) {
    if (Object.values(SITE_VIEW_STYLE).includes(style)) {
      this.setViewStyle(style);
    }
    this.buildView();
  }
  setViewStyle(newStyle) {
    if (newStyle) {
      for (let state in this.viewStyle) {
        this.viewStyle[state] = newStyle === state;
      }
    }
  }
  buildView() {
    if (this.viewStyle.table) {
      this.siteBuilder.buildTableStyle();
    }
    if (this.viewStyle.list) {
      this.siteBuilder.buildListStyle();
    }
  }
  changeViewStyle() {

  }
  updateFilteredView(event) {

  }
  updateSortedView(event) {

  }
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

