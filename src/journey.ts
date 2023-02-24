import { CrumbsMap } from './map/map';
import { CrumbPosition } from './types';
import { State } from './state/state';
import { Direction } from './direction/direction';
import { askQuestion, isLetter, printIntro } from './utils/utils';
import chalk from 'chalk';
import { END_SYMBOL, START_SYMBOL } from './constants';

export async function startTheJourney(crumbsMap: CrumbsMap) {
  console.clear();
  await askQuestion('Ready to feed the monster? [Enter to continue]:');
  printIntro();
  // Todo check if there is no end point
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
    throw new Error(
      'Failed to generate initial state. Check if you have a proper startingPosition and crumbsMap'
    );
  }
  // Make monster eat first crumb
  state.eatCrumbAtPosition(startPosition);

  await askQuestion(
    `Eat the crumb at position: ${JSON.stringify(
      startPosition
    )} - [Enter to eat]`
  );

  console.log(
    chalk.yellow.bold(
      `Crumb: ${crumbsMap.getCrumbAtPosition(startPosition)} eaten`
    )
  );

  while (true) {
    // Todo check if there is multiple possible ways to go
    // Todo check if there is fork in the way and there are two possible ways to go
    const nextDirection: Direction | undefined = Direction.getNextDirection(
      crumbsMap,
      state
    );

    if (!nextDirection) {
      throw new Error('Error finding the path for monster to go.');
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
      return;
    }
  }
}
