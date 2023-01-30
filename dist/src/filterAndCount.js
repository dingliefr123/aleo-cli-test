"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.countEle = exports.filter = void 0;
const utils_1 = require("../utils");
const data_1 = require("./data");
/**
 * It go into each **People** item and then check each **Animal** item
*/
function peopleItemFilter(pattern, peoples) {
    if (!(0, utils_1.isvalidArray)(peoples))
        return null;
    return peoples
        // filter out People item which has Animal matching the pattern
        .filter(people => (0, utils_1.isvalidArray)(people === null || people === void 0 ? void 0 : people.animals) &&
        people.animals.some(ani => { var _a; return (_a = ani === null || ani === void 0 ? void 0 : ani.name) === null || _a === void 0 ? void 0 : _a.includes(pattern); }))
        // filter all the animals matching the pattern each People
        .map(({ name, animals }) => ({ name, animals: animals.filter(ani => ani.name.includes(pattern)) }));
}
/**
 * filter a list of **Country** element,
 * each returning element must match the pattern
*/
function filter(pattern) {
    if (!pattern)
        return [];
    const arr = [];
    for (const { name, people: _peoples } of data_1.Countries) {
        const people = peopleItemFilter(pattern, _peoples);
        if ((0, utils_1.isvalidArray)(people))
            arr.push({ name, people });
    }
    return arr;
}
exports.filter = filter;
/**
 * Count the length of children and return the new name
*/
function countEle(child) {
    var _a, _b;
    const { name } = child;
    let len = 0;
    if ('people' in child) {
        len = (_a = child.people) === null || _a === void 0 ? void 0 : _a.length;
    }
    else {
        len = (_b = child.animals) === null || _b === void 0 ? void 0 : _b.length;
    }
    return `${name} [${len}]`;
}
exports.countEle = countEle;
function count() {
    return data_1.Countries.map(country => {
        const name = countEle(country);
        const people = country.people
            .map(p => ({ name: countEle(p), animals: p.animals }));
        return { name, people };
    });
}
exports.count = count;
