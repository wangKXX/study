"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassDemo2 = exports.ClassDemo = void 0;
var ClassDemo = /** @class */ (function () {
    function ClassDemo(name) {
        this.name = name;
        this.wrapName = name;
    }
    ClassDemo.getAge = function () {
        return this.age;
    };
    ClassDemo.prototype.setPhone = function (phone) {
        this.phone = phone;
    };
    ClassDemo.prototype.getName = function () {
        return this.name;
    };
    return ClassDemo;
}());
exports.ClassDemo = ClassDemo;
var ClassDemo2 = /** @class */ (function (_super) {
    __extends(ClassDemo2, _super);
    function ClassDemo2(name) {
        return _super.call(this, name) || this;
    }
    ClassDemo2.prototype.getPhone = function () {
        return '666';
    };
    ClassDemo2.getAge = function () {
        return this.age;
    };
    return ClassDemo2;
}(ClassDemo));
exports.ClassDemo2 = ClassDemo2;
