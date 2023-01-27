import Chalk from 'chalk';

const error = Chalk.bold.red;

export function logError(str: string) {
  console.log(error(str));
}