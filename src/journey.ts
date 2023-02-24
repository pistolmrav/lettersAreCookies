import { CrumbsMap } from './map/map';
import { CrumbPosition } from './types';
import { State } from './state/state';
import { Direction } from './direction/direction';
import { isLetter, printIntro } from './utils/utils';
import chalk from 'chalk';
import {
  FAILED_TO_GENERATE_INITIAL_STATE_ERROR,
  NO_NEXT_DIRECTION_ERROR,
} from './constants';

export function startTheJourney(crumbsMap: CrumbsMap) {
  console.clear();
  printIntro();
  const startPosition: CrumbPosition = crumbsMap.findStartingPosition();
  crumbsMap.checkIfEndSymbolExists();

  console.log(
    chalk.green.bold(
      `The monster finds the first crumb at position: ${JSON.stringify(
        startPosition
      )}`
    )
  );
  // Initialize our state with startPosition and current map
  let state: State = State.getInitialState(crumbsMap, startPosition);
  if (!state) {
    throw new Error(FAILED_TO_GENERATE_INITIAL_STATE_ERROR);
  }

  state.eatCrumbAtPosition(startPosition);

  console.log(
    chalk.yellow.bold(
      `Crumb: ${crumbsMap.getCrumbAtPosition(startPosition)} eaten`
    )
  );
  let shouldContinue = true;
  while (shouldContinue) {
    const nextDirection: Direction | undefined = Direction.getNextDirection(
      crumbsMap,
      state
    );

    if (!nextDirection) {
      throw new Error(NO_NEXT_DIRECTION_ERROR);
    }

    state.currentDirection = nextDirection;

    const nextPosition: CrumbPosition = {
      x: state.currentPosition.x + nextDirection.xCord,
      y: state.currentPosition.y + nextDirection.yCord,
    };

    const eatenCrumb = state.eatCrumbAtPosition(nextPosition);
    if (isLetter(eatenCrumb)) {
      console.log(
        chalk.yellow.bold(
          `The monster has found a new crumb: ${eatenCrumb}, so far it has eaten: ${state.eatenCrumbs}`
        )
      );
    }

    if (eatenCrumb === 'x') {
      console.log(
        'FINNALY! The monster got to his breakfast. This is the path it took: ' +
          chalk.green.bold.bgGray(state.crumbTrail)
      );
      console.log(
        'And he filled his belly with these delicious crumbs:',
        chalk.green.bold.bgGray(state.eatenCrumbs)
      );
      shouldContinue = false;
    }
  }

  return state;
}
