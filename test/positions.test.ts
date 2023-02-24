import { CrumbPosition } from '../src/types';
import { Positions } from '../src/positions/positions';

describe(`wasPositionVisited should return true or false`, () => {
  const visitedPositions = new Positions([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);

  const positionsToCheck = [
    {
      position: { x: 0, y: 0 },
      expected: true,
    },
    {
      position: { x: 1, y: 0 },
      expected: true,
    },
    {
      position: { x: 2, y: 0 },
      expected: true,
    },
    {
      position: { x: 3, y: 0 },
      expected: false,
    },
    {
      position: { x: 0, y: 1 },
      expected: false,
    },
  ];
  positionsToCheck.map((position) => {
    it(`should return true if position was visited`, () => {
      expect(
        visitedPositions.wasPositionVisited(position.position)
      ).toStrictEqual(position.expected);
    });
  });
});
