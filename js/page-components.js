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
  constructor(name, content, parent, mainItems) {
    super(name, content, parent);
    this.mainItems = mainItems;
    this.viewedItems = mainItems;
    this.hasLayoutStyle = true;
    this.sortBy(SORT_VIEW_TYPES.NAME_ASC);
  }
  build() {
    console.log(this.element);
    this.parent.appendChild(this.element);
  }
  filterBy(filter) {
    let mainItems = [...this.mainItems];
    if (!filter.active) {
      this.viewedItems = this.mainItems;
    } else {
      for (let ingredient of filter.ingredients) {
        mainItems = mainItems.filter(item => item.ingredientsIDArray().includes(ingredient));
      }
    }
    this.viewedItems = mainItems;
    this.setTableStyle();
    if (mainItems.length === 0) {
      this.content = `
      <div class="mainItems__no--mainItems">
        <h2>Ничего не найдено по запросу!</h2>
      </div>`
    }
    return this
  }
  sortBy(sorter) {
    if (sorter === SORT_VIEW_TYPES.NAME_ASC) {
      this.viewedItems = this.mainItems.sort((item1, item2) => Utils.sorter(item1.name, item2.name));
    }
    if (sorter === SORT_VIEW_TYPES.NAME_DESC) {
      this.viewedItems = this.mainItems.sort((item1, item2) => Utils.sorterReverse(item1.name, item2.name));
    }
    if (sorter === SORT_VIEW_TYPES.PRICE_ASC) {
      this.viewedItems = this.mainItems.sort((item1, item2) => Utils.sorterReverse(item1.price, item2.price));
    }
    if (sorter === SORT_VIEW_TYPES.PRICE_DESC) {
      this.viewedItems = this.mainItems.sort((item1, item2) => Utils.sorter(item1.price, item2.price));
    }
    this.setListStyle();
    return this
  }
  setTableStyle() {
    this.element.innerHTML = ``;
    this.viewedItems.forEach(mainItem => {
      this.element.appendChild(mainItem.getTableViewElement());
    });
    return this
  }
  setListStyle() {
    let content = ``;
    this.viewedItems.forEach(mainItem => {
      content = content + mainItem.getListView();
    });
    this.content = content;
    this.element.innerHTML = this.content;
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