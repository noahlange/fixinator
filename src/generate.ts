import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { getPrefixes, getSuffixes } from './';
import { joinIxes, isLegacyData, mungeLegacyData, cleanup } from './utils';

const paths = {
  data: resolve(__dirname, '../data/data.json'),
  ixes: resolve(__dirname, '../data/ixes.json'),
  names: resolve(__dirname, '../data/names.json')
};

function stringify(o: object): string {
  return JSON.stringify(o, null, 2);
}

try {
  // read data file
  const parsed = JSON.parse(readFileSync(paths.data, 'utf8'));
  const data = isLegacyData(parsed) ? mungeLegacyData(parsed) : parsed;
  // generate prefixes/suffixes
  const [prefixes, suffixes] = [getPrefixes(data), getSuffixes(data)];
  // write -ixes file
  writeFileSync(paths.ixes, stringify({ prefixes, suffixes }), 'utf8');
  // cross-join prefixes + suffixes
  const names = prefixes.reduce((res: string[], prefix) => {
    return res.concat(suffixes.map(suffix => joinIxes(prefix, suffix)));
  }, []);
  // write name file
  writeFileSync(paths.names, stringify(cleanup(names)), 'utf8');
} catch (e) {
  console.error(
    "Failed to generate a name file. Are you sure './data/data.json' exists?"
  );
  process.exit(1);
}
