import { Direction } from '../src/direction/direction';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../src/constants';
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

describe(`getNextPosition should return the next crumb position based on currentDirection and possible filteredDirections`, () => {});
