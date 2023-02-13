import { CrumbPosition, DirectionCordValue } from '../types';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../constants';

export class Direction {
  static readonly POSSIBLE_DIRECTIONS = {
    [DIRECTION_UP]: new Direction(0, -1),
    [DIRECTION_DOWN]: new Direction(0, 1),
    [DIRECTION_LEFT]: new Direction(-1, 0),
    [DIRECTION_RIGHT]: new Direction(1, 0),
  };
  constructor(
    private readonly xCord: DirectionCordValue,
    private readonly yCord: DirectionCordValue
  ) {}

  static getDirections() {
    return [
      this.POSSIBLE_DIRECTIONS[DIRECTION_UP],
      this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN],
      this.POSSIBLE_DIRECTIONS[DIRECTION_LEFT],
      this.POSSIBLE_DIRECTIONS[DIRECTION_RIGHT],
    ];
  }

  static getAllPositonsPossibleFromCurrentPosition(
    crumbPosition: CrumbPosition
  ): Direction[] {
    console.log('We are currently at this positions: ', crumbPosition);
    console.log('Check which positions we can move to');
    // We can move to every positions that has a valid crumb on it except we can't move backwards

    return [this.POSSIBLE_DIRECTIONS[DIRECTION_DOWN]];
  }
}
