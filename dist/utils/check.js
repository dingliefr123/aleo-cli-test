"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidParameter = void 0;
const _1 = require(".");
const typing_1 = require("../src/typing");
/**
 * Need to verify if input parameter is valid
 * It neeeds to satisfy 3 demandes
 * The fist it needs to be an valid array
 * Then its length must be latger than 2
 * Finally, the third(argv[2]) element be either '--filter=aa' or '--count'
*/
function isValidParameter(input) {
    // 1. Check if it is a valid array
    if (!(0, _1.isvalidArray)(input))
        return false;
    // 2. Its length must be larger than 2
    if (input.length < 3)
        return false;
    // 3. the third(argv[2]) element be either '--help', '--filter=aa' or '--count'
    const [, , commandStr] = input;
    if (!commandStr || !commandStr.startsWith('--'))
        return false;
    const command = commandStr.replace('--', '');
    // HELP and count command are simple
    if (command === typing_1.CommandEnum.HELP || command === typing_1.CommandEnum.COUNT)
        return true;
    // filter must have key, '=' and value
    const [k, v, ...rest] = command.split('=');
    return Boolean(k && v && rest.length === 0);
}
exports.isValidParameter = isValidParameter;
