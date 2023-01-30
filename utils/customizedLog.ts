const defaultColortxt = (txt: string) => txt;
let Chalk = {
  green: defaultColortxt,
  yellow: defaultColortxt,
  bold: { red: defaultColortxt }
};
(function(){
  try {
    Chalk = require('chalk');
  } catch(e){}
})()
const errorOutput = Chalk.bold.red;

export function logError(str: string) {
  console.log(errorOutput(str));
}

export function logFormattedInJSON(obj: unknown) {
  console.log(JSON.stringify(obj, null, 4));
}

export const greenText = Chalk.green;
export const yellowText = Chalk.yellow;