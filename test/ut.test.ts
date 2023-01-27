// Do the unit tests of all single functions
import { isValidParameter } from '../utils';

describe('isValidParameter', () => {
  it('the null or undefined object should return false', () => {
    expect(isValidParameter(null)).toBeFalsy();
    expect(isValidParameter(undefined)).toBeFalsy();
  });
  it('the empty array or the length is less than 3 should return false', () => {
    expect(isValidParameter([])).toBeFalsy();
    expect(isValidParameter(['node', 'app.js'])).toBeFalsy();
  });
  it("the third element should be '--help', '--count' or '--filter=pattern'", () => {
    expect(isValidParameter(['node', 'app.js', '--'])).toBeFalsy();
    expect(isValidParameter(['node', 'app.js', '--a'])).toBeFalsy();
    expect(isValidParameter(['node', 'app.js', '--filte'])).toBeFalsy();
    expect(isValidParameter(['node', 'app.js', '--filter='])).toBeFalsy();
    expect(isValidParameter(['node', 'app.js', '--filter==a'])).toBeFalsy();
  });
  it('if it has right input, it should return true', () => {
    expect(isValidParameter(['node', 'app.js', '--help'])).toBeTruthy();
    expect(isValidParameter(['node', 'app.js', '--count'])).toBeTruthy();
    expect(isValidParameter(['node', 'app.js', '--filter=ry'])).toBeTruthy();
  });
});