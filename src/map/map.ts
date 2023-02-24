import { CrumbPosition } from '../types';
import { checkMultipleSymbolsInLine, isValidCrumb } from '../utils/utils';
import { END_SYMBOL, START_SYMBOL } from '../constants';

export class CrumbsMap {
  constructor(private readonly lines: Array<string>) {}

  static createCrumbsMapFromInputString(inputString: string): CrumbsMap {
    return new CrumbsMap(inputString.split('\n'));
  }

  checkIfEndSymbolExists(): boolean {
    const mappedLines = this.lines.map((line, index) => ({ line, index }));
    const linesWithEndSymbol = mappedLines.filter((line) =>
      line.line.includes(END_SYMBOL)
    );
    if (linesWithEndSymbol.length === 0) {
      throw new Error(
        'Cookie monster could not find the ending crumb on the map!'
      );
    }

    return true;
  }

  findStartingPosition(): CrumbPosition {
    const mappedLines = this.lines.map((line, index) => ({ line, index }));
    const linesWithStartingSymbol = mappedLines.filter((line) =>
      line.line.includes(START_SYMBOL)
    );
    if (linesWithStartingSymbol.length === 0) {
      throw new Error(
        'Cookie monster could not find the starting crumb on the map!'
      );
    }

    if (linesWithStartingSymbol.length > 1) {
      throw new Error(
        'Cookie monster found more than one starting crumb on the map!'
      );
    }

    if (
      checkMultipleSymbolsInLine(START_SYMBOL, linesWithStartingSymbol[0].line)
    ) {
      throw new Error(
        'Cookie monster found more than one starting crumb on the map!'
      );
    }

    return {
      x: linesWithStartingSymbol[0].line.indexOf(START_SYMBOL),
      y: linesWithStartingSymbol[0].index,
    };
  }

  isMapPositionValid(crumbPositon: CrumbPosition): boolean {
    const crumbAtPosition: string | undefined = this.lines[
      crumbPositon.y
    ].charAt(crumbPositon.x);
    return isValidCrumb(crumbAtPosition);
  }

  getCrumbAtPosition(crumbPosition: CrumbPosition): string | undefined {
    return this.lines[crumbPosition.y]?.charAt(crumbPosition.x);
  }
}
