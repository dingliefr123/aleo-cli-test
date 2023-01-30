const Data= [
  {
    name: 'Zuhackog',
    people:
      [{
        name: 'Elva Baroni',
        animals:
          [{name: 'Silkworm'},
            {name: 'Zebu'},
            {name: 'King Vulture'},
            {name: 'Zebrashark'},
            {name: 'Ostrich'},
            {name: 'Waxwing'}]
      },
        {
          name: 'Lou de Bruin',
          animals:
            [{name: 'Boa'},
              {name: 'Death Adder'},
              {name: 'Okapi'},
              {name: 'Fly'},
              {name: 'Horses'}]
        }]
  },
  {
    name: 'Satanwi',
    people: [
      {
        name: 'Elmer Kinoshita',
        animals: [
          { name: 'Grouse'},
            {name: 'Hapuka'},
            {name: 'Cheetah'}
        ],
      },
      {
        name: 'Anthony Bruno',
        animals:
          [{name: 'Caracal'},
            {name: 'Anteater'},
            {name: 'Oryx'}]
      }
    ]
  }
]

function extractNames(obj) {
  if (!obj || typeof(obj) != 'object')
    return null;
  const name = Array.isArray(obj) ? null : obj.name;
  return Reflect.ownKeys(obj).map(k => {
    const v = Reflect.get(obj, k);
    return extractNames(v);
  }).concat(name);
}

// console.log(extractNames(Data).flat(Number.MAX_SAFE_INTEGER).filter(Boolean))

const CountData = [
  {
    name: "Dillauti",
    count: 5,
    people: [
      { name: "Winifred Graham", count: 6 },
      { name: "Blanche Viciani", count: 8 },
    ]
  },
  {
    name: "Tohabdal",
    count: 8,
    people: [
      { name: "Effie Houghton", count: 7 },
      { name: "Essie Bennett", count: 7 },
    ]
  },
]

function extractNameAndCnt(obj) {
  if (!obj || typeof(obj) != 'object')
    return null;
  const name = Array.isArray(obj) ? null : obj.name,
    cnt = Array.isArray(obj) ? null : obj.count,
    res = (!name || !cnt) ? null : `${name} [${cnt}]`;
  return Reflect.ownKeys(obj).map(k => {
    const v = Reflect.get(obj, k);
    return extractNameAndCnt(v);
  }).concat(res);
}

console.log(extractNameAndCnt(CountData).flat(Number.MAX_SAFE_INTEGER).filter(Boolean))