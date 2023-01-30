export { isValidParameter } from './check';
export { logError } from './customizedLog';

/**
 * This function would ensure the inut array is a valid array,
 * and it must has elements, it must not be empty
*/
export function isvalidArray(arr: unknown): arr is Array<any> {
  return Boolean(arr && Array.isArray(arr) && arr.length);
}