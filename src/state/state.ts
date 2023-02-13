import { CrumbsMap } from '../map/map';
import { Positions } from '../positions/positions';
import { Crumb, CrumbPosition } from '../types';
import { Direction } from '../movement/direction';
import { isLetter } from '../utils/utils';

export class State {
  constructor(
    private readonly crumbsMap: CrumbsMap,
    private readonly positionsVisited: Positions,
    public currentPosition: CrumbPosition,
    public currentDirection: Direction | undefined,
    private eatenCrumbs: string,
    private crumbTrail: string
  ) {}

  static getInitialState(
    crumbsMap: CrumbsMap,
    startingPosition: CrumbPosition
  ): State {
    const visitedPositions: Positions = new Positions();
    return new State(
      crumbsMap,
      visitedPositions,
      startingPosition,
      undefined,
      '',
      ''
    );
  }

  eatCrumbAtPosition(crumbPosition: CrumbPosition) {
    const crumb: Crumb = this.crumbsMap.getCrumbAtPosition(crumbPosition);
    if (crumb === undefined) {
      throw new Error(
        `Nothing to eat at position: ${crumbPosition}! You made monster hangry!`
      );
    }

    if (
      isLetter(crumb) &&
      !this.positionsVisited.wasPositionVisited(crumbPosition)
    ) {
      this.eatenCrumbs = this.eatenCrumbs.concat(crumb);
    }
    this.currentPosition = crumbPosition;
    this.crumbTrail = this.crumbTrail.concat(crumb);
    this.positionsVisited.visitPosition(crumbPosition);
    return crumb;
  }
}
