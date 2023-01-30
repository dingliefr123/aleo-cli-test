import { isvalidArray } from '../utils';
import { Countries } from './data';
import type { AnimalType, CountryType, PeopleType } from './typing';

/**
 * It go into each **People** item and then check each **Animal** item
*/
function peopleItemFilter(pattern: string, peoples: PeopleType[]) {
  if (!isvalidArray(peoples))
    return null;
  return peoples
    // filter out People item which has Animal matching the pattern
    .filter(people =>
      isvalidArray(people?.animals) &&
      people.animals.some(ani => ani?.name?.includes(pattern))
    )
    // filter all the animals matching the pattern each People
    .map(({ name, animals }) =>
      ({  name, animals: animals.filter(ani => ani.name.includes(pattern)) })
    );
}

/**
 * filter a list of **Country** element,
 * each returning element must match the pattern
*/
export function filter(pattern: string) {
  if (!pattern) return [];
  const arr: CountryType[] = [];
  for (const { name, people: _peoples } of Countries) {
    const people = peopleItemFilter(pattern, _peoples);
    if (isvalidArray(people))
      arr.push({ name, people });
  }
  return arr;
}

/**
 * Count the length of children and return the new name
*/
export function countEle(child: PeopleType | CountryType) {
  const { name } = child;
  let len = 0;
  if ('people' in child) {
    len = child.people?.length;
  } else {
    len = child.animals?.length;
  }
  return `${name} [${len}]`;
}

export function count() {
  return Countries.map(country => {
    const name = countEle(country);
    const people = country.people
      .map(p => ({ name: countEle(p), animals: p.animals }));
    return { name, people };
  });
}