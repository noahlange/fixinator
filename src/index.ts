import { withMinCount, getBestSubstring, reverse } from './utils';

interface PrefixResult {
  text: string;
  count: number;
}

const MIN_COUNT: number = 2;

/**
 * This is possibly the least efficient implementation possible.
 */
function prefixify(names: string[], name: string): PrefixResult | null {
  const prefixes: Record<string, number> = {};
  // 3-letter minimum prefix/suffix
  let i = 3;
  // for each substring, starting at (0, 3) and going until the end...
  do {
    const matches = [];
    const key = name.slice(0, i);
    // @todo - adjust for common vowel-swaps?
    const match = new RegExp(key, 'i');
    for (const toCompare of names) {
      // attempt to match prefix (0, i) to the name
      if (match.test(toCompare.slice(0, i))) {
        matches.push(toCompare);
      }
    }
    // if so, indicate another match.
    prefixes[key] = (prefixes[key] ?? 0) + matches.length;
  } while (i++ < name.length);
  // get "best" (determined by length + popularity) substring from the name
  const prefix = getBestSubstring(prefixes);
  // if one exists, hooray, otherwise, null.
  return prefix ? { text: prefix, count: prefixes[prefix] } : null;
}

/**
 * Given a list of names, pick out the most common prefixes.
 */
export function getPrefixes(names: string[]): string[] {
  const namesToPrefix = names.map(s => s.toLowerCase());
  const prefixes: Record<string, number> = {};
  for (const name of namesToPrefix) {
    const prefix = prefixify(namesToPrefix, name);
    if (prefix) {
      const { text, count } = prefix;
      prefixes[text] = (prefixes[text] ?? 0) + count;
    }
  }
  return withMinCount(prefixes, MIN_COUNT);
}

export function getSuffixes(names: string[]): string[] {
  return getPrefixes(names.map(reverse)).map(reverse);
}
