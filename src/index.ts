import { CommandEnum } from './typing';
import { argv } from 'process';
import {
  isvalidArray,
  isValidParameter,
  logError
} from '../utils';
import {
  INPUT_ERROR_EN,
  INPUT_ERROR_FR,
  HELP_MESSAGE_EN,
  HELP_MESSAGE_FR,
  NONE_FOUND_MSG
} from './consts';
import { count, filter } from './filterAndCount';
import { logFormattedInJSON } from '../utils/customizedLog';

/**
 * Based on 3 different commands to execute
*/
function execute(command: CommandEnum) {
  switch(command) {
    case CommandEnum.COUNT:
      logFormattedInJSON(count());
      break;
    case CommandEnum.HELP:
      console.log([ HELP_MESSAGE_EN, HELP_MESSAGE_FR ].join('\n'));
      break;
    default: {
      const [ key , pattern ] = command.split('=');
      if (key === CommandEnum.FILTER) {
        const res = filter(pattern);
        isvalidArray(res) ?
          logFormattedInJSON(res) :
          console.log(NONE_FOUND_MSG);
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
function app<T extends string[]>(parameters: T) {
  try {
    if (isValidParameter(parameters)) {
      // If it is valid
      const command = parameters[2].replace('--', '');
      execute(command as CommandEnum);
    } else {
      // if invalid
      const errStr = [ INPUT_ERROR_EN, INPUT_ERROR_FR ].join('\n');
      logError(errStr);
    }
  } catch(err: unknown) {
    const _err = err as string | Error;
    const errStr = typeof(_err) ===
      'string' ? _err : _err.message;
    logError(errStr);
  }
}

app(argv || []);


