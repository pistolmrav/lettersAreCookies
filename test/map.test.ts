import { CrumbsMap } from '../src/map/map';
import { CrumbPosition } from '../src/types';

describe('findExactCrumb should return exact crumb position and return it as CrumbPosition', () => {
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
