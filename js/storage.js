const uniqueStorageBucketToken = "1ma8sd72nm";
const uniqueStorageIDToken = "asdfDSzdas17df";
const storage = window.localStorage;

class Storage {
  static hasBucketItems() {
    if (storage.getItem(uniqueStorageBucketToken))
      return storage.getItem(uniqueStorageBucketToken).length > 0;
    return false
  }
  static getBucketItems() {
    return JSON.parse(storage.getItem(uniqueStorageBucketToken))
  }
  static saveBucketItems(stringedItems) {
    storage.setItem(uniqueStorageBucketToken, stringedItems);
  }
  static clear() {
    storage.setItem(uniqueStorageBucketToken, "");
    storage.setItem(uniqueStorageIDToken, "");
  }
  static getIDforNewMainComponent() {
    let id = storage.getItem(uniqueStorageIDToken);
    if (id) {
      id = Number.parseInt(id, 10);
      storage.setItem(uniqueStorageIDToken, `${id + 1}`)
    } else {
      storage.setItem(uniqueStorageIDToken, "0");
      id = 0;
    }
    return id
  }
}
