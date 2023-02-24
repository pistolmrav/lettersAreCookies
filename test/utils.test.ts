import { Crumb } from '../src/types';
import {
  checkMultipleSymbolsInLine,
  isLetter,
  isValidCrumb,
} from '../src/utils/utils';

describe(`isValid crumb should return true or false `, () => {
  const validCrumbs: Crumb[] = ['A', 'D', 'F', '-', '+', '|'];
  const invalidCrumbs: Crumb[] = [' ', '!', ''];

  it(`should return true for valid crumbs`, () => {
    validCrumbs.forEach((crumb) => {
      expect(isValidCrumb(crumb)).toBe(true);
    });
  });
  it(`should return false for invalid crumbs`, () => {
    invalidCrumbs.forEach((crumb) => {
      expect(isValidCrumb(crumb)).toBe(false);
    });
  });
});

describe(`isLetter should return true if crumb is letter`, () => {
  const validCrumbs = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const invalidCrumbs = ['-', '+', '|', ' '];
  it(`should return true for valid crumbs`, () => {
    validCrumbs.forEach((crumb) => {
      expect(isLetter(crumb)).toBe(true);
    });
  });
  it(`should return false for invalid crumbs`, () => {
    invalidCrumbs.forEach((crumb) => {
      expect(isLetter(crumb)).toBe(false);
    });
  });
});

describe(`checkMultiplSymboldsInLine should return true if there are multiple symbols in line`, () => {
  const testCases = [
    {
      symbol: '@',
      line: '@-A-+-B-x',
      expected: false,
    },
    {
      symbol: '@',
      line: '@-A-+-B-x@',
      expected: true,
    },
    {
      symbol: '@',
      line: '@-A-+-B-x@-A-+-B-x@',
      expected: true,
    },
  ];

  testCases.map((testCase) =>
    it(`should return ${testCase.expected} for ${testCase.line}`, () => {
      expect(checkMultipleSymbolsInLine(testCase.symbol, testCase.line)).toBe(
        testCase.expected
      );
    })
  );
});
