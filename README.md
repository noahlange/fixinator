# -fixinator

Given a list of names, find the most common prefixes and suffixes. For names and stuff.

## Installation

Clone and install with Yarn.

If I have given you the `data.json` file, put it in `./data`. Then run `yarn start` to
generate the prefix file and name list.

```bash
yarn run build
```

### Data files

If I have not given you the `data.json` file (permissions stuff, sorry), you
can write your own by putting an arbitrary number of strings into a top-level JSON array, e.g.:

```json
[
  "John",
  "Paul",
  "George",
  "Ringo"
]
```
