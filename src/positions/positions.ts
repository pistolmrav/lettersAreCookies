import { CrumbPosition } from '../types';

export class Positions {
  visitedPositions: CrumbPosition[] = [];

  wasPositionVisited(currentPosition: CrumbPosition): boolean {
    const wasVisited = this.visitedPositions.filter((visitedPosition) => {
      return (
        visitedPosition.x === currentPosition.x &&
        visitedPosition.y === currentPosition.y
      );
    });

    if (wasVisited.length) {
      console.log(
        'Check completed the position was visited: ',
        wasVisited.length,
        ' times'
      );
      return true;
    }

    console.log('Check completed, the position wasnt visited yet.');
    return false;
  }

  visitPosition(position: CrumbPosition) {
    this.visitedPositions.push(position);
  }
}
