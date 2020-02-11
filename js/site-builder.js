class Utils {
  static getBody () {
    return document.querySelector("body");
  }
  static sorter(item1, item2) {
    if (item1 > item2) return 1;
    if (item1 < item2) return -1;
    return 0
  }
  static sorterReverse(item1, item2) {
    if (item1 > item2) return -1;
    if (item1 < item2) return 1;
    return 0
  }
}

class SiteBuilder {
  constructor(pageComponents, parent) {
    this.parent = parent;
    this.components = pageComponents.getComponents();
    this.main = pageComponents.getComponent("main");
  }
  static initialize() {
    let body = Utils.getBody();
    body.innerHTML = initialState;
  }
  buildTableStyle() {
    this.clearParent();
    this.components.forEach(component => {
      if (component.hasLayoutStyle) component.setTableStyle().build();
      else component.build();
    });
  }
  buildListStyle() {
    this.clearParent();
    this.components.forEach(component => {
      if (component.hasLayoutStyle) component.setListStyle().build();
      else component.build();
    });
  }
  clearParent() {
    this.parent.innerHTML = `
    <div class="page-wrapper">
      <div class="page-wrapper__inner container">
      </div>
    </div>`;
  }
  filterAndUpdateMain(filter) {
    this.main.filterBy(filter).update();
  }
  sortAndUpdateMain(sorter) {
    this.main.sortBy(sorter).update();
  }
}

class Filter {
  constructor() {
    this.active = false;
    this.ingredients = [];
    this.calories = [];
  }
  updateIngredientsState(type, state) {
    if (!state) {
      this.ingredients = this.ingredients.filter(ingredient => ingredient !== type); //remove ingredient from filter
    } else {
      this.ingredients.push(type);
    }
    this.isFiltered();
  }
  updateCaloriesState(type, state) {
    if (!state) {
      this.ingredients = this.ingredients.filter(ingredient => ingredient !== type); //remove ingredient from filter
    } else {
      this.ingredients.push(type);
    }
    this.isFiltered();
  }
  isFiltered() {
    this.active = this.ingredients.length > 0 || this.calories.length > 0;
  }
  clearFilter() {
    this.active = false;
    this.ingredients = [];
    this.calories = [];
    let checkboxes = Array.from(document.querySelectorAll(`input[type="checkbox"]`)); //revisit and rearrange connections
    checkboxes.forEach(checkbox => checkbox.checked = false);
  }
}

class Controller {
  constructor(siteBuilder) {
    this.viewStyle = {};
    this.initialiseViewStyle();
    this.siteBuilder = siteBuilder;
    this.filter = new Filter();
  }
  initialiseViewStyle() {
    for (let state in SITE_VIEW_STYLE) {
      this.viewStyle[SITE_VIEW_STYLE[state]] = false;
    }
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
  reactToFilter(event) {
    if (this.shouldReactToFilterEvent(event)) {
      if (event.target.name === FILTER_VIEW_TYPES.INGREDIENTS) {
        this.filter.updateIngredientsState(event.target.id, event.target.checked);
      }
      if (event.target.name === FILTER_VIEW_TYPES.CALORIES) {
        this.filter.updateCaloriesState(event.target.id, event.target.checked);
      }
      if (event.target.id === "remove-filters") {
        this.filter.clearFilter();
      }
    this.siteBuilder.filterAndUpdateMain(this.filter);
    }
  }
  shouldReactToFilterEvent(event) {
    return Object.values(FILTER_VIEW_TYPES).includes(event.target.name) || event.target.id === "remove-filters"
  }
  reactToSorter(event) {
    if (this.shouldReactToSortEvent(event)) {
      this.siteBuilder.sortAndUpdateMain(event.target.value);
    }
  }
  shouldReactToSortEvent(event) {
    return Object.values(SORT_VIEW_TYPES).includes(event.target.value)
  }
  updateView() {

  }
  changeViewStyle() {

  }
  updateFilteredView(event) {

  }
  updateSortedView(event) {

  }
}





