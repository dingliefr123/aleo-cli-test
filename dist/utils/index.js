"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isvalidArray = exports.logError = exports.isValidParameter = void 0;
var check_1 = require("./check");
Object.defineProperty(exports, "isValidParameter", { enumerable: true, get: function () { return check_1.isValidParameter; } });
var customizedLog_1 = require("./customizedLog");
Object.defineProperty(exports, "logError", { enumerable: true, get: function () { return customizedLog_1.logError; } });
/**
 * This function would ensure the inut array is a valid array,
 * and it must has elements, it must not be empty
*/
function isvalidArray(arr) {
    return Boolean(arr && Array.isArray(arr) && arr.length);
}
exports.isvalidArray = isvalidArray;
