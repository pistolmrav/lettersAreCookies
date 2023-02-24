import { CrumbsMap } from '../src/map/map';
import { CrumbPosition } from '../src/types';

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

describe(`checkIfEndSymbolExists should return true or throw error`, () => {
  const validMaps = [
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      expected: true,
    },
    {
      lines: [
        '@---A--x--+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      expected: true,
    },
  ];

  validMaps.map((map) => {
    const workMap = new CrumbsMap(map.lines);
    it(`should return expected result for given lines`, () => {
      expect(workMap.checkIfEndSymbolExists()).toStrictEqual(map.expected);
    });
  });

  const invalidMap = [
    '@---A-----+',
    '          |',
    '  -B-+    |',
    '      |   |',
    '      +---C',
  ];

  const workMap = new CrumbsMap(invalidMap);
  it(`should throw error for given lines`, () => {
    expect(() => workMap.checkIfEndSymbolExists()).toThrow();
  });
});

describe(`findStartingPosition should return starting position or throw error`, () => {
  const validMaps = [
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      expected: { x: 0, y: 0 } as CrumbPosition,
    },
    {
      lines: [
        'x---A-----+',
        '          |',
        '  @-B-+   |',
        '      |   |',
        '      +---C',
      ],
      expected: { x: 2, y: 2 } as CrumbPosition,
    },
    {
      lines: [
        'x---A----+',
        '          |',
        '          |',
        '          |',
        '     @+---C',
      ],
      expected: { x: 5, y: 4 } as CrumbPosition,
    },
  ];

  validMaps.map((map) => {
    const workMap = new CrumbsMap(map.lines);
    it(`should return expected result for given lines`, () => {
      expect(workMap.findStartingPosition()).toStrictEqual(map.expected);
    });
  });

  const invalidMaps = [
    ['x---A-----+', '          |', '  -B-+    |', '      |   |', '      +---C'],
    ['x---A--@@-+', '          |', '  -B-+    |', '      |   |', '      +---C'],
    ['x---A--@--+', '          |', '  -B-+ @  |', '      |   |', '      +---C'],
  ];

  invalidMaps.map((map) => {
    const workMap = new CrumbsMap(map);
    it(`should throw error for given lines`, () => {
      expect(() => workMap.findStartingPosition()).toThrow();
    });
  });
});

describe(`isMapPositionValid should return true or false`, () => {
  const maps = [
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      position: { x: 0, y: 0 } as CrumbPosition,
      expected: true,
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
      expected: true,
    },
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      position: { x: 2, y: 1 } as CrumbPosition,
      expected: false,
    },
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      position: { x: 3, y: 3 } as CrumbPosition,
      expected: false,
    },
  ];

  maps.map((map) => {
    const workMap = new CrumbsMap(map.lines);
    it(`should return expected result for given lines`, () => {
      expect(workMap.isMapPositionValid(map.position)).toStrictEqual(
        map.expected
      );
    });
  });
});

describe(`getCrumbAtPosition should return crumb at given position`, () => {
  const maps = [
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
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      position: { x: 2, y: 1 } as CrumbPosition,
      expected: ' ',
    },
    {
      lines: [
        '@---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ],
      position: { x: 3, y: 3 } as CrumbPosition,
      expected: ' ',
    },
  ];

  maps.map((map) => {
    const workMap = new CrumbsMap(map.lines);
    it(`should return expected result for given lines`, () => {
      expect(workMap.getCrumbAtPosition(map.position)).toStrictEqual(
        map.expected
      );
    });
  });
});
