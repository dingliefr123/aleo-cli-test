import { CliInputType, CommandEnum } from '../src/typing';

/**
 * Need to verify if input parameter is valid
 * It neeeds to satisfy 3 demandes
 * The fist it needs to be an valid array
 * Then its length must be latger than 2
 * Finally, the third(argv[2]) element be either '--filter=aa' or '--count' 
*/


export function isValidParameter(input: unknown): input is CliInputType {
  // 1. Check if it is a valid array
  if (!input || !Array.isArray(input))
    return false;
  // 2. Its length must be larger than 2
	if (input.length < 3)
		return false;
	// 3. the third(argv[2]) element be either '--filter=aa' or '--count'
	const [ ,,commandStr ] = input as string[];
  if (!commandStr || !commandStr.startsWith('--'))
    return false;
  const command = commandStr.replace('--', '');
  // HELP and count command are simple
  if (command === CommandEnum.HELP || command === CommandEnum.COUNT)
    return true;
  // filter must have key, '=' and value
  const [ k, v, ...rest ] = command.split('=');
  return  Boolean(k && v && rest.length === 0);
}