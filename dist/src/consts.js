"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HELP_MESSAGE_FR = exports.HELP_MESSAGE_TXT_FR = exports.HELP_MESSAGE_EN = exports.HELP_MESSAGE_TXT_EN = exports.NONE_FOUND_MSG = exports.NONE_FOUND_TXT = exports.INPUT_ERROR_FR = exports.INPUT_ERROR_EN = void 0;
const customizedLog_1 = require("../utils/customizedLog");
const typing_1 = require("./typing");
exports.INPUT_ERROR_EN = 'Invalid parameter.You can use --help to get all valid parameters.';
exports.INPUT_ERROR_FR = "Le paramèter est invalide. Vous pouvez essayer d'entrer --help à afficher tous les commands";
exports.NONE_FOUND_TXT = 'NONE FOUND';
exports.NONE_FOUND_MSG = (0, customizedLog_1.yellowText)(exports.NONE_FOUND_TXT);
const COUNT_TEXT = '--' + typing_1.CommandEnum.COUNT;
const FILTER_TEXT = `--${typing_1.CommandEnum.FILTER}=pattern`;
exports.HELP_MESSAGE_TXT_EN = `${COUNT_TEXT} can count the number of people and animals, and ${FILTER_TEXT} can only display the animales matching the pattern`;
exports.HELP_MESSAGE_EN = (0, customizedLog_1.greenText)(exports.HELP_MESSAGE_TXT_EN);
exports.HELP_MESSAGE_TXT_FR = `${COUNT_TEXT} peut compter le nombre de personnes et animals, et ${FILTER_TEXT} peut uniquement montrer les animals en correspondant le pattern`;
exports.HELP_MESSAGE_FR = (0, customizedLog_1.greenText)(exports.HELP_MESSAGE_TXT_FR);
