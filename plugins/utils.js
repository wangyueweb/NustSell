"use strict";

import Vue from 'vue'

var _this;
export function Tool() {
  _this = this;
}

Tool.prototype._colorfulConsole = function () {
  // orange => method
  // green => 请求成功
  // red => 请求失败
  // skyblue => socket
  // pink => watch
  var key,
    value,
    color,
    args = arguments;
  key = "%c" + args[0] + ":" || "";
  color = "color:" + args[2] || "";
  value = args[1] || "";
  console.log(key, color);
  console.log(value);
  return null;
};
Tool.prototype.isNumber = function (value) {
  return typeof value === "number" && !isNaN(value);
};

Vue.prototype.Tool = new Tool();
