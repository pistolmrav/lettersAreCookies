import {Movement} from "./movement/movement";
import {State} from "./state/state";
import {CrumbsMap} from "./map/map";

const exampleMaps: Array<string> = [
    `  
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
      `,
    `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
    `,
    `
  @---A---+
          |
  x-B-+   |
      |   |
      +---C
    `
]

console.log("Hell man! Lets start searching for the crumbs")