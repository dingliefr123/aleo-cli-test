"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yellowText = exports.greenText = exports.logFormattedInJSON = exports.logError = void 0;
const defaultColortxt = (txt) => txt;
let Chalk = {
    green: defaultColortxt,
    yellow: defaultColortxt,
    bold: { red: defaultColortxt }
};
(function () {
    try {
        Chalk = require('chalk');
    }
    catch (e) { }
})();
const errorOutput = Chalk.bold.red;
function logError(str) {
    console.log(errorOutput(str));
}
exports.logError = logError;
function logFormattedInJSON(obj) {
    console.log(JSON.stringify(obj, null, 4));
}
exports.logFormattedInJSON = logFormattedInJSON;
exports.greenText = Chalk.green;
exports.yellowText = Chalk.yellow;
