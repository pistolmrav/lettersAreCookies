import { CrumbsMap } from '../map/map';
import { Positions } from '../positions/positions';
import { CrumbPosition } from '../types';
import { Direction } from '../movement/direction';

export class State {
  constructor(
    private readonly crumbsMap: CrumbsMap,
    private readonly positionsVisited: Positions,
    currentPosition: CrumbPosition,
    currentDirection: Direction | undefined
  ) {}

  static getInitialState(
    crumbsMap: CrumbsMap,
    startingPosition: CrumbPosition
  ): State {
    const visitedPositions: Positions = new Positions();
    return new State(crumbsMap, visitedPositions, startingPosition, undefined);
  }
}
