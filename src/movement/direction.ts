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
} from '../constants';
import { CrumbsMap } from '../map/map';
import { State } from '../state/state';
import { isValidCrumb } from '../utils/utils';

export class Direction {
  static readonly POSSIBLE_DIRECTIONS: POSSIBLE_DIRECTIONS = {
    UP: new Direction(0, -1),
    DOWN: new Direction(0, 1),
    LEFT: new Direction(-1, 0),
    RIGHT: new Direction(1, 0),
  };
  constructor(
    public readonly xCord: DirectionCordValue,
    public readonly yCord: DirectionCordValue
  ) {}
  static getMappedDirections(): Map<string, Direction> {
    return new Map<string, Direction>()
      .set(DIRECTION_UP, this.POSSIBLE_DIRECTIONS[DIRECTION_UP])
      .set(DIRECTION_DOWN, this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN])
      .set(DIRECTION_LEFT, this.POSSIBLE_DIRECTIONS[DIRECTION_LEFT])
      .set(DIRECTION_RIGHT, this.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT]);
  }

  static getNextDirection(
    crumbsMap: CrumbsMap,
    currentState: State
  ): Direction | undefined {
    const currentDirection: Direction | undefined =
      currentState.currentDirection;
    const currentPosition: CrumbPosition = currentState.currentPosition;
    let analyzedDirections: any = [];
    const mappedDirections: Map<string, Direction> = this.getMappedDirections();
    mappedDirections.forEach((direction, directionKey) => {
      if (!this.isOppositeDirection(currentDirection, direction)) {
        const newPosition: CrumbPosition = {
          x: currentPosition.x + direction.xCord,
          y: currentPosition.y + direction.yCord,
        };
        const crumbAtNewPosition: Crumb =
          crumbsMap.getCrumbAtPosition(newPosition);
        analyzedDirections.push({
          directionKey: directionKey,
          newPosition: newPosition,
          crumbAtNewPosition: crumbAtNewPosition,
          direction: direction,
        });
      }
    });

    const filteredDirections: Array<any> = analyzedDirections.filter(
      (analyzedDirections: any) => {
        return (
          isValidCrumb(analyzedDirections.crumbAtNewPosition) &&
          !(
            currentDirection === analyzedDirections.direction &&
            crumbsMap.getCrumbAtPosition(currentPosition) === '+'
          )
        );
      }
    );

    if (filteredDirections.length === 1) {
      return filteredDirections[0].direction;
    }

    const nextPosition: any = filteredDirections.reduce(
      (acc: any, curr: any) => {
        if (!currentDirection && isValidCrumb(curr.crumbAtNewPosition)) {
          return curr;
        }

        if (curr.direction === currentDirection) {
          return curr;
        }

        if (acc.direction !== currentDirection) {
          return acc;
        }

        return acc;
      },
      {}
    );

    return nextPosition.direction;
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

  private static isOppositeDirection(
    previousDirection: Direction | undefined,
    direction: Direction
  ) {
    if (!previousDirection) {
      return false;
    }

    return this.oppositeDirections.get(previousDirection) === direction;
  }
}
