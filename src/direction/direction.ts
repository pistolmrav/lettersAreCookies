import {
  AnalyzedDirection,
  Crumb,
  CrumbPosition,
  DirectionCordValue,
  POSSIBLE_DIRECTIONS,
} from '../types';
import {
  BROKEN_PATH_ERROR,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  FAKE_TURN_ERROR,
  FORK_IN_PATH_ERROR,
  MULTIPLE_STARTING_PATHS_ERROR,
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

  static getNextDirection(
    crumbsMap: CrumbsMap,
    currentState: State
  ): Direction | undefined {
    const { currentDirection, currentPosition } = currentState;
    const crumbAtCurrentPosition: Crumb =
      crumbsMap.getCrumbAtPosition(currentPosition);

    // Analize all possible directions
    const analyzedDirections: AnalyzedDirection[] = this.getAnalyzedDirections(
      crumbsMap,
      currentDirection,
      currentPosition
    );

    // Filter out invalid directions
    const filteredDirections: AnalyzedDirection[] = this.filterValidDirections(
      currentDirection,
      currentPosition,
      analyzedDirections,
      crumbsMap
    );

    if (filteredDirections.length === 0 && crumbAtCurrentPosition === '+') {
      throw new Error(FAKE_TURN_ERROR);
    }
    if (filteredDirections.length === 0) {
      throw new Error(BROKEN_PATH_ERROR);
    }

    if (filteredDirections.length === 1) {
      return filteredDirections[0].direction;
    }

    if (
      filteredDirections.length > 1 &&
      crumbAtCurrentPosition === START_SYMBOL
    ) {
      throw new Error(MULTIPLE_STARTING_PATHS_ERROR);
    }

    if (filteredDirections.length > 1 && crumbAtCurrentPosition === '+') {
      throw new Error(FORK_IN_PATH_ERROR);
    }

    const nexDirection =
      filteredDirections.find(
        (direction) => direction.direction === currentDirection
      ) || filteredDirections[0];

    return nexDirection.direction;
  }

  public static getAnalyzedDirections(
    crumbsMap: CrumbsMap,
    currentDirection: Direction | undefined,
    currentPosition: CrumbPosition
  ): AnalyzedDirection[] {
    const mappedDirections: Map<string, Direction> = this.getMappedDirections();
    const analyzedDirections: AnalyzedDirection[] = [];

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
    analyzedDirections: AnalyzedDirection[],
    crumbsMap: CrumbsMap
  ): AnalyzedDirection[] {
    return analyzedDirections.filter(
      ({ crumbAtNewPosition, direction }: AnalyzedDirection) =>
        isValidCrumb(crumbAtNewPosition) &&
        !(
          currentDirection === direction &&
          crumbsMap.getCrumbAtPosition(currentPosition) === '+'
        )
    );
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
