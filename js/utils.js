"use strict";

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