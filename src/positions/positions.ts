import { CrumbPosition } from '../types';

export class Positions {
  constructor(public visitedPositions: CrumbPosition[] = []) {}

  wasPositionVisited(currentPosition: CrumbPosition): boolean {
    const wasVisited = this.visitedPositions.filter((visitedPosition) => {
      return (
        visitedPosition.x === currentPosition.x &&
        visitedPosition.y === currentPosition.y
      );
    });

    return !!wasVisited.length;
  }

  visitPosition(position: CrumbPosition) {
    this.visitedPositions.push(position);
  }
}
