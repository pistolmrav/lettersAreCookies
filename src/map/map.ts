import { CrumbPosition } from '../types';
import { isValidCrumb } from '../utils/utils';

export class CrumbsMap {
  constructor(private readonly lines: Array<string>) {}

  static createCrumbsMapFromInputString(inputString: string): CrumbsMap {
    return new CrumbsMap(inputString.split('\n'));
  }

  /**
   *
   * @param crumbSymbol
   */
  findSpecificCrumbOnMap(crumbSymbol: string): CrumbPosition {
    // Map through all the lines and find the exact symbol his coords are x: character positions in line, y: index of line in array
    const linesWithCrumb = this.lines.map((line, lineIndex) => ({
      line,
      lineIndex,
    }));

    const linesWithCrumbFiltered = linesWithCrumb.filter(({ line }) =>
      line.includes(crumbSymbol)
    );

    if (linesWithCrumbFiltered.length !== 1) {
      const errorMsg =
        linesWithCrumbFiltered.length === 0
          ? 'Cookie monster could not find the crumb on the map!'
          : 'Cookie monster found more than one starting crumb on the map!';
      throw new Error(errorMsg);
    }

    return {
      x: linesWithCrumbFiltered[0].line.indexOf(crumbSymbol),
      y: linesWithCrumbFiltered[0].lineIndex,
    } as CrumbPosition;
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
