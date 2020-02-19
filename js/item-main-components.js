"use strict";

class ItemMainComponent {
  constructor(item) {
    this.pureItem = {...item};
    this.item = Pizza.createPizzaFromStorage(item);
    this.DOMElement = this.createDOMElement();
    this.DOMIgredients = this.createDOMIngredients();
    this.DOMSelect = this.createDOMSelect();
    this.DOMPrice = this.createDOMPrice();
    this.DOMCalories = this.createDOMCalories();
    this.initializeDOMElement();
  }
  createDOMElement() {
    let DOMElement = document.createElement("div");
    DOMElement.className = "item item--table";
    return DOMElement
  }
  createDOMIngredients() {
    let DOMIngredients = document.createElement("div");
    DOMIngredients.className = "item__ingredients";
    this.item.ingredients.forEach(ingredient => {
      let DOMIngredient = this.createDOMIngredient(ingredient);
      DOMIngredients.appendChild(DOMIngredient);
    });
    return DOMIngredients
  }
  createDOMIngredient(ingredient) {
    let DOMIngredient = document.createElement("div");
    DOMIngredient.className = "item__ingredient";
    DOMIngredient.innerHTML = `
      <label for="${this.item.id}-${ingredient.id}">${ingredient.name} </label>
      <input disabled value="${ingredient.quantity}" pattern="\d" min="1" max="15" type="number" class=${ingredient.id} id="${this.item.id}-${ingredient.id}">
      <span class="interactive-element delete-ingredient ingredient__edit--toggle ingredient__edit--hide">&nbsp;❌</span>`;
    return DOMIngredient
  }
  addIngredientToDOMIngredients(ingredientID) {
    let ingredientName = allIngredientsMap.get(ingredientID);
    let DOMIngredient = document.createElement("div");
    DOMIngredient.className = "item__ingredient";
    DOMIngredient.innerHTML = `
      <label for="${this.item.id}-${ingredientID}">${ingredientName} </label>
      <input value="1" min="1" max="15" type="number" class=${ingredientID} id="${this.item.id}-${ingredientID}">
      <span class="interactive-element delete-ingredient ingredient__edit--toggle">&nbsp;❌</span>`;
    this.DOMIgredients.appendChild(DOMIngredient);
  }
  createDOMSelect() {
    let DOMSelect = createDOMElement("select", "add-ingredient");
    allIngredientsMap.forEach((ingredientName, ingredientID) => {
      if (!this.item.includesIngredient(ingredientID)) {
        let option = document.createElement("option");
        option.value = ingredientID;
        option.innerText = ingredientName;
        DOMSelect.appendChild(option);
      }
    });
    return DOMSelect
  }
  addOptionDOMSelect(ingredientID) {
    let option = document.createElement("option");
    option.value = ingredientID;
    option.innerText = allIngredientsMap.get(ingredientID);
    this.DOMSelect.appendChild(option);
  }
  removeOptionDOMSelect(ingredientID) {
    let option = this.DOMSelect.querySelector(`option[value=${ingredientID}`);
    this.DOMSelect.removeChild(option);
  }
  createDOMCalories() {
    let DOMPrice = document.createElement("p");
    DOMPrice.className = "item__calories";
    DOMPrice.innerText = `${this.item.calories} ккал`;
    return DOMPrice
  }
  createDOMPrice() {
    let DOMPrice = document.createElement("p");
    DOMPrice.className = "item__price";
    DOMPrice.innerText = `${this.item.price} ₴`;
    return DOMPrice
  }
  initializeDOMElement() {
    let DOMCard = createDOMElement("div", "card");
    let DOMCardFront = createDOMElement("div", "card__side card__side--front");
    let DOMCardBack = createDOMElement("div", "card__side card__side--back");
    DOMCardBack.innerHTML = `
      <img class="item__image" src="resources/img/${this.item.name}.png" onerror="this.src='resources/img/default-img.png'" alt="pizza IMG">
      <p class="item__name">${this.item.name}</p>
      <p class="item__ingredients--list">${this.item.ingredientsList()}</p>
      <p class="item__calories">${this.item.calories} ккал</p>
      <p class="item__price">${this.item.price} ₴</p>
    `;
    let DOMName = createDOMElement("p", "item__name", this.item.name);
    let reverseButton = createDOMElement("div", "reverse-btn", "↻", "reverseCard");
    let bucketButton = createDOMElement("button", "active-btn item-order ingredient__edit--toggle", "🛒", `order-${this.item.id}`);
    let saveButton = createDOMElement("button", "active-btn item__btn-save ingredient__edit--toggle ingredient__edit--hide", "Сохранить");
    let editButton = createDOMElement("button", "active-btn item__btn-edit ingredient__edit--toggle", "Изменить состав");
    let selectDIV = createDOMElement("div", "select-option ingredient__edit--toggle ingredient__edit--hide");
    let addElement = createDOMElement("span", "interactive-element add-ingredient-btn", " ➕");

    this.DOMElement.appendChild(DOMCard);
    DOMCard.append(DOMCardFront, DOMCardBack, reverseButton, bucketButton);
    DOMCardFront.append(DOMName, this.DOMIgredients, selectDIV, saveButton, editButton, this.DOMCalories, this.DOMPrice);
    selectDIV.append(this.DOMSelect, addElement);
  }
  getTableViewElement() {
    return this.DOMElement;
  }
  getListView() {
    return `<div class="item--list">
      <div class="item">
      <img class="item__logo" src="resources/img/logo.png" alt="Pizza LOGO">
      <div class="item__name">${this.item.name}</div>
      <div class="item__price">${this.item.price} ₴</div>
      </div>
      </div>`
  }
  reactToEvent(event) {
    let eventClasses = Array.from(event.target.classList);
    if (eventClasses.includes("delete-ingredient")) {
      this.removeIngredient(event);
    }
    if (eventClasses.includes("add-ingredient-btn")) {
      this.addIngredient(event);
    }
    if (event.type === "input" && event.target.nodeName === "INPUT") {
      this.updateIngredientValue(event);
    }
    if (eventClasses.includes("item__btn-edit")) this.showEdit();
    if (eventClasses.includes("item__btn-save")) {
      this.hideEdit();
      if (Pizza.different(this.pureItem, this.item)) {
        let newComponent = ItemMainComponent.createItemMainComponent(this.item);
        console.log("in main", this.item);
        this.DOMElement.before(newComponent.DOMElement);
      } else {
        alert("Состав пиццы не изменился");
      }
    }
    if (eventClasses.includes("item-order")) DOMBucket.outerAddItem(this.item);
  }
  removeIngredient(event) {
    let ingredientID = event.target.previousElementSibling.className;
    this.item.removeIngredient(ingredientID);
    event.target.parentNode.remove();
    this.addOptionDOMSelect(ingredientID);
    this.updatePriceAndCalories()
  }
  addIngredient(event) {
    let ingredientID = event.target.previousElementSibling.value;
    if (ingredientID) {
      this.item.addIngredient(ingredientID);
      this.removeOptionDOMSelect(ingredientID);
      this.addIngredientToDOMIngredients(ingredientID);
      this.updatePriceAndCalories();
    }
  }
  updateIngredientValue(event) {
    let ingredientID = event.target.className;
    let quantity = +event.target.value;
    this.item.updateIngredientQuantity(ingredientID, quantity);
    this.updatePriceAndCalories()
  }
  updatePriceAndCalories() {
    this.updatePrices();
    this.updateCalories();
  }
  updateCalories() {
    let prices = Array.from(this.DOMElement.querySelectorAll(".item__calories"));
    prices.forEach(price => price.innerHTML = `${this.item.calories} ккал`);
  }
  updatePrices() {
    let prices = Array.from(this.DOMElement.querySelectorAll(".item__price"));
    prices.forEach(price => price.innerHTML = `${this.item.price} ₴`);
  }
  showEdit() {
    let toggled = Array.from(this.DOMElement.querySelectorAll(".ingredient__edit--toggle"));
    toggled.forEach(element => element.classList.toggle("ingredient__edit--hide"));
    let inputs = Array.from(this.DOMElement.querySelectorAll("input"));
    inputs.forEach(input => input.disabled = false);
  }
  hideEdit() {
    let toggled = Array.from(this.DOMElement.querySelectorAll(".ingredient__edit--toggle"));
    toggled.forEach(element => element.classList.toggle("ingredient__edit--hide"));
    let inputs = Array.from(this.DOMElement.querySelectorAll("input"));
    inputs.forEach(input => input.disabled = true);
  }
  static createItemMainComponent(itemAncestor) {
    let item = {...itemAncestor};
    if (item.name.includes("-")) item.name = item.name.slice(0, item.name.indexOf("-"));
    let newID = Storage.getIDforNewMainComponent();
    item.name = `${item.name}-${newID}`;
    item.id = `${item.id}-${newID}`;
    let newComponent = new ItemMainComponent(item);
    newComponent.DOMElement.addEventListener("click", event => {
      newComponent.reactToEvent(event);
    });
    newComponent.DOMElement.addEventListener("input", event => {
      normalizeInput(event);
      newComponent.reactToEvent(event);
    });
    return newComponent
  }
}

const itemMainComponents = items.map(item => new ItemMainComponent(item));

itemMainComponents.forEach(component => {
  component.DOMElement.addEventListener("click", event => {
    component.reactToEvent(event);
  });
  component.DOMElement.addEventListener("input", event => {
    normalizeInput(event);
    component.reactToEvent(event);
  })
});

function createDOMElement(tag, className, innerHTML, id) {
  let element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  if (id) element.id = id;
  return element
}

function normalizeInput(event) {
  let value = event.target.value;
  if (value > 15) event.target.value = 15;
  if (value < 1) event.target.value = 1;
}