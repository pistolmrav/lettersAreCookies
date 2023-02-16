import {
  Crumb,
  CrumbPosition,
  DirectionCordValue,
  NewPosition,
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
import { isLetter, isValidCrumb } from '../utils/utils';

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

  static getAllDirections(): Direction[] {
    return [
      this.POSSIBLE_DIRECTIONS[DIRECTION_UP],
      this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      this.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
      this.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
    ];
  }
  static getMappedDirections(): Map<string, Direction> {
    return new Map<string, Direction>()
      .set(DIRECTION_UP, this.POSSIBLE_DIRECTIONS[DIRECTION_UP])
      .set(DIRECTION_DOWN, this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN])
      .set(DIRECTION_LEFT, this.POSSIBLE_DIRECTIONS[DIRECTION_LEFT])
      .set(DIRECTION_RIGHT, this.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT]);
  }

  static getAllDirectionsPossibleFromCurrentPosition(
    crumbsMap: CrumbsMap,
    crumbPosition: CrumbPosition
  ): Direction[] {
    // We can move to every positions that has a valid crumb on it except we can't move backwards
    // Direction is valid if the crumb on the newPosition is a valid crumb
    let newPositions: NewPosition[] = [];
    const allDirections: Map<string, Direction> = this.getMappedDirections();
    allDirections.forEach((direction, key) => {
      newPositions.push({
        directionKey: key,
        newPosition: {
          x: crumbPosition.x + direction.xCord,
          y: crumbPosition.y + direction.yCord,
        } as CrumbPosition,
        crumbAtNewPosition: crumbsMap.getCrumbAtPosition({
          x: crumbPosition.x + direction.xCord,
          y: crumbPosition.y + direction.yCord,
        } as CrumbPosition),
      });
    });
    const validNewPositions: NewPosition[] = newPositions.filter(
      (newPosition) => {
        return crumbsMap.isMapPositionValid(newPosition.newPosition);
      }
    );

    return validNewPositions.map((pos) => {
      return this.POSSIBLE_DIRECTIONS[pos.directionKey];
    });
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
