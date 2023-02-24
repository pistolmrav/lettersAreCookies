import { CrumbPosition } from '../src/types';
import { CrumbsMap } from '../src/map/map';
import { State } from '../src/state/state';

describe(`eatCrumbAtPosition should return the eaten crumb`, () => {
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
      position: { x: 2, y: 3 } as CrumbPosition,
      expected: ' ',
    },
  ];

  maps.map((map) => {
    const workMap: CrumbsMap = new CrumbsMap(map.lines);
    const state: State = State.getInitialState(workMap, {
      x: 0,
      y: 0,
    } as CrumbPosition);
    it(`should return eaten crumb or throw error if there is no crumb to eats`, () => {
      if (map.expected === ' ') {
        expect(() => state.eatCrumbAtPosition(map.position)).toThrow();
      } else {
        expect(state.eatCrumbAtPosition(map.position)).toStrictEqual(
          map.expected
        );
      }
    });
  });
});
