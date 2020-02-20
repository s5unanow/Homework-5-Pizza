"use strict";

let constructPizza = new Pizza({
  id:"custom",
  name: "Ваше название",
  basePrice: 70,
  ingredients: [],
  baseCalories: 200
});

class CustomCreator extends ItemMainComponent {
  constructor() {
    super(constructPizza);
    console.log(this.item);
    this.pureItem = {...this.item};
  }
  createDOMIngredients() {
    let DOMIngredients = document.createElement("div");
    DOMIngredients.className = "item__ingredients";
    return DOMIngredients
  }
  initializeDOMElement() {
    let DOMCard = createDOMElement("div", "card");
    let DOMCardFront = createDOMElement("div", "card__side card__side--front");

    let DOMName = this.createNameInput();
    let bucketButton = createDOMElement("button", "active-btn item-order", "🛒", `order-${this.item.id}`);
    let saveButton = createDOMElement("button", "active-btn item__btn-save", "Сохранить");
    let selectDIV = createDOMElement("div", "select-option");
    let addElement = createDOMElement("span", "interactive-element add-ingredient-btn", " ➕");

    this.DOMElement.appendChild(DOMCard);
    DOMCard.append(DOMCardFront, bucketButton);
    DOMCardFront.append(DOMName, this.DOMIgredients, selectDIV, saveButton, this.DOMCalories, this.DOMPrice);
    selectDIV.append(this.DOMSelect, addElement);

    this.DOMElement.addEventListener("click", event => {
      this.reactToEvent(event);
    });
    this.DOMElement.addEventListener("input", event => {
      if (event.target.type === "number") normalizeInput(event);
      this.reactToEvent(event);
    });
  }
  createNameInput() {
    let input = createDOMElement("input", "custom-item__name", this.item.name);
    input.type = "text";
    input.placeholder = "Ваше название";
    input.maxLength = 10;
    return input
  }
  showEdit() {
  }
  hideEdit() {
  }
  static createItemMainComponent(itemAncestor) {
    let item = {...itemAncestor};
    let newID = Storage.getIDforNewMainComponent();
    item.id = `${item.id}-${newID}`;
    if (item.name.includes("-")) item.name = item.name.slice(0, item.name.indexOf("-"));
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
      let DOMName = this.DOMElement.querySelector(".custom-item__name");
      this.item.name = DOMName.value;
      let newComponent = CustomCreator.createItemMainComponent(this.item);
      this.DOMElement.before(newComponent.DOMElement);
      this.item = Pizza.createPizzaFromStorage(this.pureItem);
      this.resetDOMIngredients();
      itemMainComponents.unshift(newComponent);
    }
    if (eventClasses.includes("item-order")) DOMBucket.outerAddItem(this.item);
  }
}

const ccreator = new CustomCreator();