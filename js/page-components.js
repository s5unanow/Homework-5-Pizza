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
  }
  build() {
    this.element.innerHTML = `<main>` + this.content + `</main>`;
    this.parent.appendChild(this.element);
  }
  filterBy(filter) {
    let items = [...this.items];
    for (let filterType of filter) {
      if (filter[filterType].length > 0) {
        filterType.forEach(type => {
          items = items.filter(item => item[filterType].includes(type));
        })
      }
    }
    this.viewedItems = items;
  }
  sortBy(sorter) {
    this.viewedItems = this.items.sort((item1, item2) => item1[parameter] - item2[parameter])
  }
  setTableStyle() {
    let content = ``;
    this.viewedItems.forEach(item => {
      content.concat(`
      <div class=".items-wrapper--table">
        <div class="item">
          <img class="item__image" src="resources/img/${item.name}.jpg" alt="pizza IMG">
          <p class="item__name">${item.name}</p>
          <p class="item__ingredients">${item.ingredientsList()}</p>
          <p class="item__calories">${item.calories}</p>
          <p class="item__price">${item.price}</p>
        </div>
      </div>`);
    });
    this.content = content;
    return this
  }
  setListStyle() {
    let content = ``;
    this.viewedItems.forEach(item => {
      content.concat(`
      <div class="items-wrapper--list">
        <div class="item">
          <img class="item__logo" src="resources/img/logo.png" alt="Pizza LOGO">
          <div class="item__name">${item.name}</div>
          <div class="item__price">${item.price}</div>
        </div>
      </div>`);
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
}