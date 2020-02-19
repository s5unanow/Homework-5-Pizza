class Bucket {
  constructor(parentNode) {
    this.DOMparent = parentNode;
    this.DOMElement = null;
    this.DOMBucketListCards = null;
    this.items = new Map();
    this.price = 0;
    this.initialize()
  }
  initialize() {
    if (Storage.hasBucketItems()) {
      this.items = Storage.getBucketItems();
    }
    this.drawBucket()
  }
  drawBucket() {
    this.DOMElement = document.createElement("div");
    this.DOMElement.className = "bucket";
    this.DOMElement.innerHTML = `
    <div class="bucket">
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
          <span class="order-sum-price">${this.calcOverallPrice()}</span>
          <button class="active-btn order-btn">Заказать!</button>
        </div>
      </div>
    </div>
    `;
    this.DOMparent.appendChild(this.DOMElement);
    this.DOMBucketListCards = this.DOMElement.querySelector(".bucket__list--cards");
    if (this.hasItems()) {
      this.items.forEach(bucketItem => {
        this.drawItem(bucketItem.item);
      });
    }
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
  hasItems() {
    return this.items.size > 0
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
      this.drawItem(item);
    }
    this.updateBucketQuantity();
  }
  drawItem(item) {
    let itemID = `card-${item.id}`;
    let DOMItem = createDOMElement("div", "bucket__list--item", itemID);
    DOMItem.innerHTML = `
       <div class="bucket-item__delete">❌</div>
       <div class="bucket-item__img">
        <img src="resources/img/${item.name}.png" alt="Pizza img">
      </div>
      <div class="bucket-item__col-3">
        <div class="bucket-item__name">${item.name}</div>
        <div class="bucket-item__quantity">
          <label>кол-во: <input value="1" min="1" max="15" type="number" id="bucket-${item.name}"></label>
        </div>
      </div>
      <div class="bucket-item__price">${item.price} ₴</div>
    `;
    this.DOMBucketListCards.appendChild(DOMItem);

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
  updateItemView() {

  }
  updateBucketQuantity() {

  }
  removeItemCard(event) {

  }
  calcItemCardPrice() {

  }
  makeOrder() {

  }
}