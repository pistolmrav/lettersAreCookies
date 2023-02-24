import { Direction } from '../src/direction/direction';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../src/constants';
import { CrumbsMap } from '../src/map/map';
import { State } from '../src/state/state';
import { CrumbPosition } from '../src/types';
import { Positions } from '../src/positions/positions';
describe(`isOppositeDirection should return true if given direction is opposite to current direction`, () => {
  const validDirections = [
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      expected: true,
    },
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
      expected: true,
    },
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      expected: true,
    },
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
      expected: true,
    },
  ];

  validDirections.map((direction) => {
    it(`should return true for given direction`, () => {
      expect(
        Direction.isOppositeDirection(
          direction.currentDirection,
          direction.givenDirection
        )
      ).toBe(direction.expected);
    });
  });

  const invalidDirections = [
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
    },
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
    },
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
    },
    {
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      givenDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
    },
  ];

  invalidDirections.map((direction) => {
    it(`should return false for given direction`, () => {
      expect(
        Direction.isOppositeDirection(
          direction.currentDirection,
          direction.givenDirection
        )
      ).toBe(false);
    });
  });
});

describe('getNextDirection should return valid next direction or throw error', () => {
  const testData = [
    {
      map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
    `,
      currentPosition: { x: 3, y: 3 } as CrumbPosition,
      positionsVisited: new Positions(),
      currentDirection: undefined,
      eatenCrumbs: '',
      crumbTrail: '@',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
    },
    {
      map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
    `,
      currentPosition: { x: 4, y: 3 } as CrumbPosition,
      positionsVisited: new Positions([{ x: 3, y: 3 }]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      eatenCrumbs: '',
      crumbTrail: '@-',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
    },
    {
      map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
    `,
      currentPosition: { x: 5, y: 3 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      eatenCrumbs: '',
      crumbTrail: '@--',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
    },
    {
      map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
    `,
      currentPosition: { x: 6, y: 3 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      eatenCrumbs: 'A',
      crumbTrail: '@--A',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
    },
    {
      map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
    `,
      currentPosition: { x: 10, y: 3 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
        { x: 7, y: 3 },
        { x: 8, y: 3 },
        { x: 9, y: 3 },
        { x: 10, y: 3 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      eatenCrumbs: 'A',
      crumbTrail: '@--A---+',
      expectedDirection: undefined,
    },
    {
      map: `
     +-L-+
     |  +A-+
    @B+ ++ H
     ++    x
    `,
      currentPosition: { x: 5, y: 3 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 4, y: 3 },
        { x: 5, y: 3 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      eatenCrumbs: 'B',
      crumbTrail: '@B',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
    },
    {
      map: `
     +-L-+
     |  +A-+
    @B+ ++ H
     ++    x
    `,
      currentPosition: { x: 6, y: 3 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      eatenCrumbs: 'B',
      crumbTrail: '@B+',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
    },
    {
      map: `
     +-L-+
     |  +A-+
    @B+ ++ H
     ++    x
    `,
      currentPosition: { x: 6, y: 4 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
        { x: 6, y: 4 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      eatenCrumbs: 'B',
      crumbTrail: '@B++',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
    },
    {
      map: `
     +-L-+
     |  +A-+
    @B+ ++ H
     ++    x
    `,
      currentPosition: { x: 5, y: 4 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
        { x: 6, y: 4 },
        { x: 5, y: 4 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
      eatenCrumbs: 'B',
      crumbTrail: '@B++',
      expectedDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
    },
    {
      map: `
   @--A-+
        |
         
        B-x
    `,
      currentPosition: { x: 8, y: 2 } as CrumbPosition,
      positionsVisited: new Positions([
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
        { x: 6, y: 1 },
        { x: 7, y: 1 },
        { x: 8, y: 1 },
        { x: 8, y: 2 },
      ]),
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      eatenCrumbs: 'A',
      crumbTrail: '@--A-+|',
      expectedDirection: undefined,
    },
  ];

  testData.map((data) => {
    it('should return valid next direction', () => {
      const workMap = CrumbsMap.createCrumbsMapFromInputString(data.map);
      const workState = new State(
        workMap,
        data.positionsVisited,
        data.currentPosition,
        data.currentDirection,
        data.eatenCrumbs,
        data.crumbTrail
      );
      if (!data.expectedDirection) {
        expect(() => Direction.getNextDirection(workMap, workState)).toThrow();
      } else {
        expect(Direction.getNextDirection(workMap, workState)).toBe(
          data.expectedDirection
        );
      }
    });
  });
});

describe(`getAnalyzedDirection should return a list of directions with additional information`, () => {
  const testData = [
    {
      map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
      `,
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      currentPosition: { x: 7, y: 3 },
      expectedDirections: [
        {
          directionKey: DIRECTION_UP,
          newPosition: { x: 7, y: 2 },
          crumbAtNewPosition: ' ',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
        },
        {
          directionKey: DIRECTION_DOWN,
          newPosition: { x: 7, y: 4 },
          crumbAtNewPosition: ' ',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
        },
        {
          directionKey: DIRECTION_RIGHT,
          newPosition: { x: 8, y: 3 },
          crumbAtNewPosition: '-',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
        },
      ],
    },
    {
      map: `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
      `,
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      currentPosition: { x: 5, y: 4 },
      expectedDirections: [
        {
          directionKey: DIRECTION_UP,
          newPosition: { x: 5, y: 3 },
          crumbAtNewPosition: '|',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
        },
        {
          directionKey: DIRECTION_DOWN,
          newPosition: { x: 5, y: 5 },
          crumbAtNewPosition: '|',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
        },
        {
          directionKey: DIRECTION_RIGHT,
          newPosition: { x: 6, y: 4 },
          crumbAtNewPosition: '-',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
        },
      ],
    },
    {
      map: `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
      `,
      currentDirection: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
      currentPosition: { x: 5, y: 4 },
      expectedDirections: [
        {
          directionKey: DIRECTION_UP,
          newPosition: { x: 5, y: 3 },
          crumbAtNewPosition: '|',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_UP],
        },
        {
          directionKey: DIRECTION_LEFT,
          newPosition: { x: 4, y: 4 },
          crumbAtNewPosition: '-',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
        },
        {
          directionKey: DIRECTION_RIGHT,
          newPosition: { x: 6, y: 4 },
          crumbAtNewPosition: '-',
          direction: Direction.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
        },
      ],
    },
  ];

  testData.map((data) => {
    const workMap = CrumbsMap.createCrumbsMapFromInputString(data.map);
    it('should return analyzed directions list', () => {
      expect(
        Direction.getAnalyzedDirections(
          workMap,
          data.currentDirection,
          data.currentPosition
        )
      ).toEqual(data.expectedDirections);
    });
  });
});
