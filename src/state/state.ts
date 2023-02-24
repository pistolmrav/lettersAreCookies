import { CrumbsMap } from '../map/map';
import { Positions } from '../positions/positions';
import { Crumb, CrumbPosition } from '../types';
import { Direction } from '../direction/direction';
import { isLetter } from '../utils/utils';
import { NOTHING_TO_EAT_ERROR } from '../constants';

export class State {
  constructor(
    private readonly crumbsMap: CrumbsMap,
    private readonly positionsVisited: Positions,
    public currentPosition: CrumbPosition,
    public currentDirection: Direction | undefined,
    public eatenCrumbs: string,
    public crumbTrail: string
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
    if (crumb === ' ' || crumb === undefined) {
      throw new Error(NOTHING_TO_EAT_ERROR(crumbPosition));
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
