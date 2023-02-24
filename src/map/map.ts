import { CrumbPosition } from '../types';
import { checkMultipleSymbolsInLine, isValidCrumb } from '../utils/utils';
import {
  END_SYMBOL,
  MULTIPLE_START_SYMBOLS_ERROR,
  NO_END_SYMBOL_ERROR,
  NO_START_SYMBOL_ERROR,
  START_SYMBOL,
} from '../constants';

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
      throw new Error(NO_END_SYMBOL_ERROR);
    }

    return true;
  }

  findStartingPosition(): CrumbPosition {
    const mappedLines = this.lines.map((line, index) => ({ line, index }));
    const linesWithStartingSymbol = mappedLines.filter((line) =>
      line.line.includes(START_SYMBOL)
    );
    if (linesWithStartingSymbol.length === 0) {
      throw new Error(NO_START_SYMBOL_ERROR);
    }

    if (
      linesWithStartingSymbol.length > 1 ||
      checkMultipleSymbolsInLine(START_SYMBOL, linesWithStartingSymbol[0].line)
    ) {
      throw new Error(MULTIPLE_START_SYMBOLS_ERROR);
    }

    return {
      x: linesWithStartingSymbol[0].line.indexOf(START_SYMBOL),
      y: linesWithStartingSymbol[0].index,
    };
  }

  isMapPositionValid(crumbPosition: CrumbPosition): boolean {
    const crumbAtPosition: string | undefined = this.lines[
      crumbPosition.y
    ].charAt(crumbPosition.x);
    return isValidCrumb(crumbAtPosition);
  }

  getCrumbAtPosition(crumbPosition: CrumbPosition): string | undefined {
    return this.lines[crumbPosition.y]?.charAt(crumbPosition.x);
  }
}
