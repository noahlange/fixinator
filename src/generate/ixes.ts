import { getPrefixes, getSuffixes } from '..';
import items from '../../data/data.json';

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const filename = resolve(__dirname, '../../data/ixes.json');

const res = items.map(({ race, given }) => ({
  race,
  prefixes: getPrefixes(given),
  suffixes: getSuffixes(given)
}));

writeFileSync(filename, JSON.stringify(res, null, 2), 'utf8');
