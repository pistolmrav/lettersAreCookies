import { DirectionCordValue } from '../types';
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
    return this.POSSIBLE_DIRECTIONS;
  }
}
