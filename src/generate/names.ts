import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { joinIxes } from '../utils';

import races from '../../data/ixes.json';

const res = (() => {
  const names = [];
  for (const race of races) {
    // only prefix/suffix within the same race
    for (const prefix of race.prefixes) {
      for (const suffix of race.suffixes) {
        names.push(joinIxes(prefix, suffix));
      }
    }
  }
  // alpha sort
  return names.sort((a, b) => a.localeCompare(b));
})();

writeFileSync(
  resolve(__dirname, '../../data/names.json'),
  JSON.stringify(res, null, 2),
  'utf8'
);
