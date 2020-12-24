/**
 * Filter out rare/uncommon items.
 */
export function withMinCount(
  hash: Record<string, number>,
  min: number = 3
): string[] {
  return Object.entries(hash)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce(
      (a: string[], [name, count]) => (count >= min ? a.concat(name) : a),
      []
    );
}

/**
 * Return the best substring, as determined by length * popularity / 2.
 */
export function getBestSubstring(hash: Record<string, number>): string | null {
  return (
    Object.keys(hash)
      .sort((a, b) => b.length * (hash[b] / 2) - a.length * (hash[a] / 2))
      .shift() ?? null
  );
}

/**
 * Merge a prefix/suffix pair, smoothing over any weirdnesses that might crop
 * up in the middle.
 */
export function joinIxes(prefix: string, suffix: string): string {
  return (
    [prefix, suffix]
      .join('')
      // conjoining vowels
      .replace(/(?:a|e|o){2}/gi, s => s[1])
      // eh/uh/oh/ah all look a little weird
      .replace(/(a|e|o|u)h/gi, s => s[0])
  );
}

/**
 * Reverse a string. Why isn't this in the stdlib?
 */
export function reverse(str: string): string {
  return Array.from(str).reverse().join('');
}

// sort the list, uppercase the first letter of each
export function cleanup(names: string[]): string[] {
  return names
    .sort((a, b) => a.localeCompare(b))
    .map(word => word[0].toUpperCase() + word.slice(1));
}

interface LegacyItem {
  race: string;
  given: string[];
}

export function isLegacyData(
  data: string[] | LegacyItem[]
): data is LegacyItem[] {
  return typeof data[0] !== 'string';
}

export function mungeLegacyData(data: LegacyItem[]): string[] {
  return data.reduce((a: string[], b) => a.concat(b.given), []);
}
