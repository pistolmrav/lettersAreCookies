import {
  Crumb,
  CrumbPosition,
  DirectionCordValue,
  POSSIBLE_DIRECTIONS,
} from '../types';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  START_SYMBOL,
} from '../constants';
import { CrumbsMap } from '../map/map';
import { State } from '../state/state';
import { isValidCrumb } from '../utils/utils';

export class Direction {
  constructor(
    public readonly xCord: DirectionCordValue,
    public readonly yCord: DirectionCordValue
  ) {}

  static readonly POSSIBLE_DIRECTIONS: POSSIBLE_DIRECTIONS = {
    UP: new Direction(0, -1),
    DOWN: new Direction(0, 1),
    LEFT: new Direction(-1, 0),
    RIGHT: new Direction(1, 0),
  };

  static getMappedDirections(): Map<string, Direction> {
    return new Map<string, Direction>()
      .set(DIRECTION_UP, this.POSSIBLE_DIRECTIONS[DIRECTION_UP])
      .set(DIRECTION_DOWN, this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN])
      .set(DIRECTION_LEFT, this.POSSIBLE_DIRECTIONS[DIRECTION_LEFT])
      .set(DIRECTION_RIGHT, this.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT]);
  }

  // Todo - refactor this method
  static getNextDirection(
    crumbsMap: CrumbsMap,
    currentState: State
  ): Direction | undefined {
    const { currentDirection, currentPosition } = currentState;
    const crumbAtCurrentPosition: Crumb =
      crumbsMap.getCrumbAtPosition(currentPosition);

    const analyzedDirections = this.getAnalyzedDirections(
      crumbsMap,
      currentDirection,
      currentPosition
    );

    const filteredDirections: any = this.filterValidDirections(
      currentDirection,
      currentPosition,
      analyzedDirections,
      crumbsMap
    );

    if (filteredDirections.length === 0 && crumbAtCurrentPosition === '+') {
      throw new Error("Fake turn. Monster can't go anywhere.");
    }
    if (filteredDirections.length === 0) {
      throw new Error("Broken path. Monster can't go anywhere.");
    }

    if (filteredDirections.length === 1) {
      return filteredDirections[0].direction;
    }

    if (
      filteredDirections.length > 1 &&
      crumbAtCurrentPosition === START_SYMBOL
    ) {
      throw new Error(
        'Multiple starting paths. The monster cant decide where to go'
      );
    }

    if (filteredDirections.length > 1 && crumbAtCurrentPosition === '+') {
      throw new Error('Fork in path');
    }

    const nextPosition = this.getNextPosition(
      currentDirection,
      filteredDirections
    );

    return nextPosition.direction;
  }

  private static getAnalyzedDirections(
    crumbsMap: CrumbsMap,
    currentDirection: Direction | undefined,
    currentPosition: CrumbPosition
  ): any {
    const mappedDirections: Map<string, Direction> = this.getMappedDirections();
    const analyzedDirections: any = [];

    mappedDirections.forEach((direction, directionKey) => {
      if (!this.isOppositeDirection(currentDirection, direction)) {
        const newPosition: CrumbPosition = {
          x: currentPosition.x + direction.xCord,
          y: currentPosition.y + direction.yCord,
        };

        const crumbAtNewPosition = crumbsMap.getCrumbAtPosition(newPosition);

        analyzedDirections.push({
          directionKey,
          newPosition,
          crumbAtNewPosition,
          direction,
        });
      }
    });

    return analyzedDirections;
  }

  private static filterValidDirections(
    currentDirection: Direction | undefined,
    currentPosition: CrumbPosition,
    analyzedDirections: any,
    crumbsMap: CrumbsMap
  ): any {
    return analyzedDirections.filter(
      ({ crumbAtNewPosition, direction }: any) =>
        isValidCrumb(crumbAtNewPosition) &&
        !(
          currentDirection === direction &&
          crumbsMap.getCrumbAtPosition(currentPosition) === '+'
        )
    );
  }

  static getNextPosition(
    currentDirection: Direction | undefined,
    filteredDirections: any
  ): any {
    return filteredDirections.reduce((acc: any, curr: any) => {
      if (curr.direction === currentDirection) {
        return curr;
      }

      if (acc.direction !== currentDirection) {
        return acc;
      }

      return acc;
    });
  }

  private static oppositeDirections = new Map<Direction, Direction>()
    .set(
      this.POSSIBLE_DIRECTIONS[DIRECTION_UP],
      this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN]
    )
    .set(
      this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      this.POSSIBLE_DIRECTIONS[DIRECTION_UP]
    )
    .set(
      this.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
      this.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT]
    )
    .set(
      this.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      this.POSSIBLE_DIRECTIONS[DIRECTION_LEFT]
    );

  static isOppositeDirection(
    previousDirection: Direction | undefined,
    direction: Direction
  ) {
    if (!previousDirection) {
      return false;
    }

    return Direction.oppositeDirections.get(previousDirection) === direction;
  }
}
