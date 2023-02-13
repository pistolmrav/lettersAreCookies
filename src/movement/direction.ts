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

export class Direction {
  static readonly POSSIBLE_DIRECTIONS: POSSIBLE_DIRECTIONS = {
    UP: new Direction(0, -1),
    DOWN: new Direction(0, 1),
    LEFT: new Direction(-1, 0),
    RIGHT: new Direction(1, 0),
  };
  constructor(
    private readonly xCord: DirectionCordValue,
    private readonly yCord: DirectionCordValue
  ) {}

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
}
