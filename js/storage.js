const uniqueStorageBucketToken = "1ma8sd72nm";
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
  }
}
