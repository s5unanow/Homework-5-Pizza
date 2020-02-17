class PageComponent {
  constructor(name, content, parent = Utils.getBody()) {
    this.name = name;
    this.element = document.createElement(name);
    this.content = content;
    this.parent = parent;
    this.hasLayoutStyle = false;
  }
  build() {
    this.element.innerHTML = this.content;
    this.parent.appendChild(this.element);
  }
  update() {
    this.element.innerHTML = this.content;
  }
}

class AsideMenu extends PageComponent {
  constructor(name, content, parent) {
    super(name, content, parent);
    this.hasLayoutStyle = true;
  }
  setTableStyle() {
    this.content = asideFilterTableContent;
    return this
  }
  setListStyle() {
    this.content = asideFilterListContent;
    return this
  }
}

class Main extends PageComponent {
  constructor(name, content, parent, items) {
    super(name, content, parent);
    this.items = items;
    this.viewedItems = items;
    this.hasLayoutStyle = true;
    this.sortBy(SORT_VIEW_TYPES.NAME_ASC);
  }
  build() {
    this.element.innerHTML = this.content;
    this.parent.appendChild(this.element);
  }
  filterBy(filter) {
    let items = [...this.items];
    if (!filter.active) {
      this.viewedItems = this.items;
    } else {
      for (let ingredient of filter.ingredients) {
        items = items.filter(item => item.ingredientsIDArray().includes(ingredient));
      }
    }
    this.viewedItems = items;
    this.setTableStyle();
    if (items.length === 0) {
      this.content = `
      <div class="items__no--items">
        <h2>Ничего не найдено по запросу!</h2>
      </div>`
    }
    return this
  }
  sortBy(sorter) {
    if (sorter === SORT_VIEW_TYPES.NAME_ASC) {
      this.viewedItems = this.items.sort((item1, item2) => Utils.sorter(item1.name, item2.name));
    }
    if (sorter === SORT_VIEW_TYPES.NAME_DESC) {
      this.viewedItems = this.items.sort((item1, item2) => Utils.sorterReverse(item1.name, item2.name));
    }
    if (sorter === SORT_VIEW_TYPES.PRICE_ASC) {
      this.viewedItems = this.items.sort((item1, item2) => Utils.sorterReverse(item1.price, item2.price));
    }
    if (sorter === SORT_VIEW_TYPES.PRICE_DESC) {
      this.viewedItems = this.items.sort((item1, item2) => Utils.sorter(item1.price, item2.price));
    }
    this.setListStyle();
    return this
  }
  setTableStyle() {
    let content = ``;
    this.viewedItems.forEach(item => {
      content = content +`
      <div class="item--table">
        <div class="item-card">
          <img class="item__image" src="resources/img/${item.name}.png" alt="pizza IMG">
          <p class="item__name">${item.name}</p>
          <p class="item__ingredients">${item.ingredientsList()}</p>
          <p class="item__calories">${item.calories} ккал</p>
          <p class="item__price">${item.price} ₴</p>
        </div>
      </div>`;
    });
    this.content = content;
    return this
  }
  setListStyle() {
    let content = ``;
    this.viewedItems.forEach(item => {
      content = content + `
      <div class="item--list">
        <div class="item">
          <img class="item__logo" src="resources/img/logo.png" alt="Pizza LOGO">
          <div class="item__name">${item.name}</div>
          <div class="item__price">${item.price} ₴</div>
        </div>
      </div>`
    });
    this.content = content;
    return this
  }
}

class PageComponents {
  constructor(...components) {
    this.components = components;
  }
  addComponent(component) {
    if (component) {
      this.components.push(component);
    }
  }
  getComponents() {
    return this.components;
  }
  getComponent(name) {
    return this.components.find(component => component.name === name);
  }
}