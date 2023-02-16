import { CrumbsMap } from '../src/map/map';
import { CrumbPosition } from '../src/types';

describe('findSpecificCrumbOnMap should return exact crumb positions and return it as CrumbPosition or throw error', () => {
  const validMaps = [
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      symbol: '@',
      expected: { x: 0, y: 0 } as CrumbPosition,
    },
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      symbol: 'x',
      expected: { x: 2, y: 2 } as CrumbPosition,
    },
  ];

  validMaps.map((map) => {
    const workMap = new CrumbsMap(map.lines);
    it(`should return expected result for given lines`, () => {
      expect(workMap.findSpecificCrumbOnMap(map.symbol)).toStrictEqual(
        map.expected
      );
    });
  });

  const invalidMaps = [
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      symbol: 'y',
    },
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      symbol: 'č',
    },
  ];

  invalidMaps.map((map) => {
    const workMap = new CrumbsMap(map.lines);
    it(`should throw an error if it wasnt able to find the crumbPosition`, () => {
      expect(() => {
        workMap.findSpecificCrumbOnMap(map.symbol);
      }).toThrow();
    });
  });
});

describe(`getCrumbAtPosition should return crumb at given position`, () => {
  const validMaps = [
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      position: { x: 0, y: 0 } as CrumbPosition,
      expected: '@',
    },
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      position: { x: 2, y: 2 } as CrumbPosition,
      expected: 'x',
    },
  ];

  validMaps.map((map) => {
    const workMap = new CrumbsMap(map.lines);
    it(`should return expected result for given lines`, () => {
      expect(workMap.getCrumbAtPosition(map.position)).toStrictEqual(
        map.expected
      );
    });
  });
});
