import { CrumbPosition } from '../types';

export class CrumbsMap {
  constructor(private readonly lines: Array<string>) {}

  static createCrumbsMapFromInputString(inputString: string): CrumbsMap {
    return new CrumbsMap(inputString.split('\n'));
  }

  findSpecificCrumbOnMap(crumbSymbol: string): CrumbPosition | undefined {
    // Map through all the lines and find the exact symbol his coords are x: character position in line, y: index of line in array
    const crumbPosition: CrumbPosition | undefined = this.lines.reduce(
      (acc: CrumbPosition | undefined, curr: string, currentIndex) => {
        console.log('Curr: ', curr);
        if (curr.includes(crumbSymbol)) {
          return {
            ...acc,
            x: curr.indexOf(crumbSymbol),
            y: currentIndex,
          } as CrumbPosition;
        }

        return acc;
      },

      undefined
    );

    if (!crumbPosition) {
      throw new Error('Cookie monster could not find the crumb on the map!');
    }

    return crumbPosition;
  }
}
