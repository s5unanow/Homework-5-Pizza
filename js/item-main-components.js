class ItemMainComponent {
  constructor(item, ) {
    this.item = item;
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
  }
  createDOMIngredient(ingredient) {
    let DOMIngredient = document.createElement("div");
    DOMIngredient.className = "item__ingredient";
    DOMIngredient.innerHTML = `
      <label for="${this.item.id}-${ingredient.id}">Тунец </label>
      <input value="${ingredient.quantity}" min="1" max="15" type="number" id="${this.item.id}-${ingredient.id}">
      <span class="interactive-element delete-ingredient">&nbsp;❌</span>`;
    return DOMIngredient
  }
  createDOMSelect() {
    let DOMSelect = document.createElement("select");
    allIngredientsMap.forEach((IngredientName, IngredientID) => {
      if (!this.item.includesIngredient(IngredientID)) {
        let option = document.createElement("option");
        option.value = IngredientID;
        option.innerText = IngredientName;
        DOMSelect.appendChild(option);
      }
    });
    return DOMSelect
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
    let DOMCardBack = createDOMElement("div", "card__side card__side--front");
    DOMCardBack.innerHTML = `
      <img class="item__image" src="resources/img/${this.item.name}.jpg" alt="pizza IMG">
      <p class="item__name">${this.item.name}</p>
      <p class="item__ingredients">${this.item.ingredientsList()}</p>
      <p class="item__calories">${this.item.calories} ккал</p>
      <p class="item__price">${this.item.price} ₴</p>
    `;
    let DOMName = createDOMElement("p", "item__name", this.item.name);
    let reverseButton = createDOMElement("div", "reverse-btn", "↻", "reverseCard");
    let saveButton = createDOMElement("button", "active-btn item__btn-save", "Сохранить");
    let editButton = createDOMElement("button", "active-btn item__btn-edit", "Изменить состав");
    let selectDIV = createDOMElement("div", "select-option");
    let addElement = createDOMElement("span", "interactive-element add-ingredient", " ➕");

    this.DOMElement.appendChild(DOMCard);
    DOMCard.append(DOMCardFront, DOMCardBack, reverseButton);
    DOMCardFront.append(DOMName, this.DOMIgredients, selectDIV, saveButton, editButton, this.DOMCalories, this.DOMPrice);

  }
  getTableViewElement() {

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
  removeFromView() {

  }
  includesIngredients() {
    return
  }
  getDOMElement() {

  }
  updatePriceAndCalories() {

  }
  reactToEvent(event) {

  }
}

const itemMainComponents = items.map(item => {

});

itemMainComponents.forEach(component => {
  component.DOMElement.addEventListener("click", event => {
    component.reactToEvent(event);
  })
});

function createDOMElement(tag, className, innerHTML, id) {
  let element = document.createElement(tag);
  element.className = className;
  element.innerHTML = innerHTML;
  element.id = id;
  return element
}