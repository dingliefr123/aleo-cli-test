"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typing_1 = require("./typing");
const process_1 = require("process");
const utils_1 = require("../utils");
const consts_1 = require("./consts");
const filterAndCount_1 = require("./filterAndCount");
const customizedLog_1 = require("../utils/customizedLog");
/**
 * Based on 3 different commands to execute
*/
function execute(command) {
    switch (command) {
        case typing_1.CommandEnum.COUNT:
            (0, customizedLog_1.logFormattedInJSON)((0, filterAndCount_1.count)());
            break;
        case typing_1.CommandEnum.HELP:
            console.log([consts_1.HELP_MESSAGE_EN, consts_1.HELP_MESSAGE_FR].join('\n'));
            break;
        default: {
            const [key, pattern] = command.split('=');
            if (key === typing_1.CommandEnum.FILTER) {
                const res = (0, filterAndCount_1.filter)(pattern);
                (0, utils_1.isvalidArray)(res) ?
                    (0, customizedLog_1.logFormattedInJSON)(res) :
                    console.log(consts_1.NONE_FOUND_MSG);
            }
            else
                throw new Error('Could not find corresponding handler');
        }
    }
}
/**
 * The entrance must verify the input parameters, especially the second element(argv[2]),
 * which must be '--help', '--count' or '--filter'.
 * '--help' is to show all available commands
 * '--count' is to execute counting operation
 * '--filter' is to execute
*/
function app(parameters) {
    try {
        if ((0, utils_1.isValidParameter)(parameters)) {
            // If it is valid
            const command = parameters[2].replace('--', '');
            execute(command);
        }
        else {
            // if invalid
            const errStr = [consts_1.INPUT_ERROR_EN, consts_1.INPUT_ERROR_FR].join('\n');
            (0, utils_1.logError)(errStr);
        }
    }
    catch (err) {
        const _err = err;
        const errStr = typeof (_err) ===
            'string' ? _err : _err.message;
        (0, utils_1.logError)(errStr);
    }
}
app(process_1.argv || []);
