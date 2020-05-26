"use strict";

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arr = [1, 2, 3];
var new1 = arr.map(function (item) {
  return item + 1;
});
arr.forEach(function (item) {
  return item + 1;
});

var Person = function Person() {
  _classCallCheck(this, Person);

  this.name1 = 1111;
  this.ff = 123;
};

new Person();

(function () {
  var png = 'png';
  return png;
})();

console.log(obj);
var obj = {
  zhangsan: 'zhangsan'
};

for (var key in obj) {
  console.log(key);
}