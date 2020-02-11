SiteBuilder.initialize();

let parentContainer = document.querySelector(".page-wrapper__inner");
let DOMHeader = new PageComponent("header", headerContent, parentContainer);
let DOMAsideMenu = new AsideMenu("aside", null, parentContainer);
let DOMMain = new Main("main", null, parentContainer, items);
let DOMFooter = new PageComponent("footer", footerContent, parentContainer);

const pageComponents = new PageComponents(DOMHeader, DOMAsideMenu, DOMMain, DOMFooter);
const siteBuilder = new SiteBuilder(pageComponents, parentContainer);
const controller = new Controller(siteBuilder);

const layoutMenuTable = document.querySelector(".layout-menu__option-table");
const layoutMenuList = document.querySelector(".layout-menu__option-list");
let filterMenu = DOMAsideMenu.element;

layoutMenuTable.addEventListener("click", event => {
  controller.initializeView(SITE_VIEW_STYLE.TABLE);
});

layoutMenuList.addEventListener("click", event => {
  controller.initializeView(SITE_VIEW_STYLE.LIST);
});

filterMenu.addEventListener("click", event => {
  controller.reactToFilter(event);
});

filterMenu.addEventListener("change", event => {
  controller.reactToSorter(event);
});