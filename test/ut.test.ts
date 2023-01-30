// Do the unit tests of all single functions
import { isValidParameter } from '../utils';
import { count, filter } from '../src/filterAndCount';
import { RyPatternRes, RightCountRes } from './consts';

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



describe('filter animal name of each people item by input pattern', () => {
  it('if pattern string is valid, an empty array should be returned', () => {
    expect(filter('')).toHaveLength(0);
  });
  it('if pattern string is a random string, an empty array should be returned', () => {
    expect(filter('89AHS')).toHaveLength(0);
  });
  it('if pattern string is ry, a certain value should be returned', () => {
    const res = filter('ry');
    const rightLen = RyPatternRes.length;
    expect(res).toHaveLength(rightLen);
    for(let i = 0;i < rightLen;i++) {
      const { name: rightPName, people: rightPs } = RyPatternRes[i],
        { name: countryN, people } = res[i] || {};
      expect(countryN).toBe(rightPName);
      for (let j = 0;j < rightPs.length;j++) {
        const { name: pName, animals } = people[j],
          { name: rightPN, animals: rightAnis } = rightPs[j];
        expect(pName).toBe(rightPN);
        for (let k = 0;k < rightAnis.length;k++) {
          expect(animals[k].name).toBe(rightAnis[k].name);
        }
      }
    }
  });
});

describe('count function', () => {
  const res = count();
  RightCountRes.forEach(({ name: rightCunName, count: rightCount, people: rightPeople }, idx) => {
    const { name: cunAndCnt, people } = res[idx];
    const rightCountryAndCnt = `${rightCunName} [${rightCount}]`;
    describe(`testing country ${rightCunName}, the value should be: ${rightCountryAndCnt}`, () => {
      expect(cunAndCnt).toBe(rightCountryAndCnt);
      for(const { name: rightPName, count: rightCnt } of rightPeople) {
        const rightPeoAndCntOutput = `${rightPName} [${rightCnt}]`;
        it(`testing people ${rightPName}, right output should be: ${rightPeoAndCntOutput}`, () => {
          expect(people.some(p => p.name === rightPeoAndCntOutput)).toBeTruthy();
        });
      }
    });
  });
});
