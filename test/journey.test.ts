import { startTheJourney } from '../src/journey';
import { CrumbsMap } from '../src/map/map';

describe('startTheJourney', () => {
  const scenarios = [
    {
      map: `
                  @---A---+
                          |
                  x-B-+   C
                      |   |
                      +---+
                `,
      expectedEatenCrumbs: 'ACB',
      expectedCrumbTrail: '@---A---+|C|+---+|+-B-x',
    },
    {
      map: `
                  @
                  | +-C--+
                  A |    |
                  +---B--+
                    |      x
                    |      |
                    +---D--+
                `,
      expectedEatenCrumbs: 'ABCD',
      expectedCrumbTrail: '@|A+---B--+|+--C-+|-||+---D--+|x',
    },
    {
      map: `
                  @---A---+
                          |
                  x-B-+   |
                      |   |
                      +---C
                `,
      expectedEatenCrumbs: 'ACB',
      expectedCrumbTrail: '@---A---+|||C---+|+-B-x',
    },
    {
      map: `
                     +-O-N-+
                     |     |
                     |   +-I-+
                 @-G-O-+ | | |
                     | | +-+ E
                     +-+     S
                             |
                             x
                `,
      expectedEatenCrumbs: 'GOONIES',
      expectedCrumbTrail: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
    },
    {
      map: `
             +-L-+
             |  +A-+
            @B+ ++ H
             ++    x
                `,
      expectedEatenCrumbs: 'BLAH',
      expectedCrumbTrail: '@B+++B|+-L-+A+++A-+Hx',
    },
    {
      map: `
              @-A--+
                   |
                   +-B--x-C--D
                `,
      expectedEatenCrumbs: 'AB',
      expectedCrumbTrail: '@-A--+|+-B--x',
    },
    {
      map: `
             -A---+
                  |
          x-B-+   C
              |   |
              +---+
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
   @--A---+
          |
    B-+   C
      |   |
      +---+
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
   @--A---+
          |
          C
          x
      @-B-+
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
   @--A--x

  x-B-+
      |
      @
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
   @--A-+
        |
         
        B-x
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
  x-B-@-A-x
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
    {
      map: `
  @-A-+-B-x
                `,
      expectedEatenCrumbs: undefined,
      expectedCrumbTrail: undefined,
    },
  ];

  scenarios.forEach((scenario) => {
    it(`should return ${scenario.expectedEatenCrumbs} when given ${scenario.map}`, () => {
      const workMap = CrumbsMap.createCrumbsMapFromInputString(scenario.map);
      if (!scenario.expectedCrumbTrail) {
        expect(() => startTheJourney(workMap)).toThrow();
      } else {
        const result = startTheJourney(workMap);
        expect(result.eatenCrumbs).toEqual(scenario.expectedEatenCrumbs);
        expect(result.crumbTrail).toEqual(scenario.expectedCrumbTrail);
      }
    });
  });
});
