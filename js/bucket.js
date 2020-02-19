class Bucket {
  constructor(parentNode) {
    this.DOMparent = parentNode;
    this.DOMElement = createDOMElement("div", "bucket");
    this.DOMBucketListCards = null;
    this.DOMPrice = null;
    this.DOMQuantity = null;
    this.items = new Map();
    this.price = 0;
    this.initialize()
  }
  initialize() {
    if (Storage.hasBucketItems()) {
      let items = Storage.getBucketItems();
      for (let itemID in items) {
        let itemData = items[itemID].item;
        let newItem = Pizza.createPizzaFromStorage(itemData);
        this.items.set(itemID, {quantity: items[itemID].quantity, item: newItem});
      }
    }
  }
  build() {
    this.DOMElement.innerHTML = `
      <div class="bucket__info">
        <div class="bucket__quantity">
          ${this.calcOverallQuantity()}
        </div>
        <div class="bucket__img">
          <img src="resources/img/bucket.png" alt="Bucket">
        </div>
      </div>
      <div class="bucket__list">
        <div class="bucket__list--cards">
        </div>
        <div class="bucket__order">
          <span class="order-sum-price">${this.calcOverallPrice()} ₴</span>
          <button class="active-btn order-btn">Заказать!</button>
        </div>
      </div>
    `;
    this.DOMparent.appendChild(this.DOMElement);
    this.DOMBucketListCards = this.DOMElement.querySelector(".bucket__list--cards");
    this.DOMQuantity = this.DOMElement.querySelector(".bucket__quantity");
    this.DOMPrice = this.DOMElement.querySelector(".order-sum-price");
    if (this.hasItems()) {
      this.items.forEach(bucketItem => {
        this.createAndDrawItem(bucketItem.item);
      });
    }

    let orderButton = document.querySelector(".order-btn");
    orderButton.addEventListener("click", event => {
      this.makeOrder();
    });
  }
  hasItems() {
    return this.items.size > 0
  }
  calcOverallPrice() {
    let overAllPrice = 0;
    if (this.hasItems()) {
      this.items.forEach(bucketItem => {
        overAllPrice += bucketItem.item.price * bucketItem.quantity
      });
    }
    return overAllPrice;
  }
  calcOverallQuantity() {
    let overAllQuantity = 0;
    if (this.hasItems()) {
      this.items.forEach(bucketItem => {
        overAllQuantity += bucketItem.quantity
      });
    }
    return overAllQuantity;
  }
  outerAddItem(item) {
    if (this.items.has(item.id)) {
      this.increaseItemQuantity(item);
      this.updateItemView(item.id);
    } else {
      this.items.set(item.id, {item: item, quantity: 1});
      this.createAndDrawItem(item);
    }
    this.updateBucketView();
  }
  createAndDrawItem(item) {
    let itemCardID = `card-${item.id}`;
    let DOMItem = createDOMElement("div", "bucket__list--item", "", itemCardID);
    DOMItem.innerHTML = `
       <div class="bucket-item__delete">❌</div>
       <div class="bucket-item__img">
        <img src="resources/img/${item.name}.png" alt="Pizza img">
      </div>
      <div class="bucket-item__col-3">
        <div class="bucket-item__name">${item.name}</div>
        <div class="bucket-item__quantity">
          <label>кол-во: <input value="${this.items.get(item.id).quantity}" min="1" max="15" type="number" id="bucket-${item.name}"></label>
        </div>
      </div>
      <div class="bucket-item__price">${item.price} ₴</div>
    `;
    this.DOMBucketListCards.appendChild(DOMItem);

    let removeButton = DOMItem.querySelector(".bucket-item__delete");
    removeButton.addEventListener("click", event => {
      this.removeItemCard(event);
      this.updateBucketView();
    });
    let inputQuantity = DOMItem.querySelector("input");
    inputQuantity.addEventListener("input", event => {
      normalizeInput(event);
      let bucketItem = this.items.get(item.id);
      bucketItem.quantity = +event.target.value;
      this.updateBucketView();
      this.updateItemView(item.id);
    });
    this.saveBucket();
    return DOMItem
  }
  increaseItemQuantity(item) {
    let newQuantity = this.items.get(item.id).quantity + 1;
    this.items.set(item.id, {item: item, quantity: newQuantity});
  }
  decreaseItemQuantity(item) {
    let newQuantity = this.items.get(item.id).quantity - 1;
    this.items.set(item.id, {item: item, quantity: newQuantity});
  }
  updateItemView(itemID) {
    let itemCardID = `#card-${itemID}`;
    let DOMItem = this.DOMElement.querySelector(itemCardID);
    let quantity = this.items.get(itemID).quantity;
    let DOMQuantity = DOMItem.querySelector("input");
    DOMQuantity.value = quantity;
    let price = this.calcItemCardPrice(itemID);
    let DOMPrice = DOMItem.querySelector(".bucket-item__price");
    DOMPrice.innerText = `${price} ₴`;
    this.saveBucket();
  }
  updateBucketView() {
    this.updateBucketQuantity();
    this.updateBucketPrice();
    this.saveBucket();
  }
  updateBucketQuantity() {
    this.DOMQuantity.innerText = this.calcOverallQuantity();
  }
  updateBucketPrice() {
    this.DOMPrice.innerText = this.calcOverallPrice() + " ₴";
  }
  removeItemCard(event) {
    let DOMItem = event.target.closest(".bucket__list--item");
    let itemID = DOMItem.id.slice(5);
    DOMItem.remove();
    this.items.delete(itemID);
    this.saveBucket();
  }
  getItemIDFromElementID(element) {
    element.id.slice(element.id.indexOf("-") + 1);
  }
  calcItemCardPrice(itemID) {
    let basicPrice = this.items.get(itemID).item.price;
    let quantity = this.items.get(itemID).quantity;
    return basicPrice * quantity
  }
  makeOrder() {
    if (this.hasItems()) {
      alert("Спасибо! Ваш заказ принят в обработку!");
      this.items = new Map();
      Storage.clear();
      this.refreshState();
    } else {
      alert("Корзина пуста")
    }
  }
  refreshState() {
    this.updateBucketPrice();
    this.updateBucketQuantity();
    this.DOMBucketListCards.innerHTML = "";
  }
  saveBucket() {
    Storage.saveBucketItems(this.stringifyItems());
  }
  stringifyItems() {
    let items = {};
    if (this.hasItems()) {
      this.items.forEach((item, key) => {
        items[key] = item;
      });
    }
    return JSON.stringify(items);
  }
}