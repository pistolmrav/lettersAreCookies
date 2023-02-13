import { Direction } from './movement/direction';

export type Crumb = string | undefined; // Crumb can either be a letter, symbol or empty

export interface CrumbPosition {
  x: number; // Horizontal
  y: number; // Vertical
}
export type DirectionCordValue = -1 | 0 | 1;

export interface NewPosition {
  directionKey: string;
  newPosition: CrumbPosition;
}

export interface POSSIBLE_DIRECTIONS {
  [key: string]: Direction;
}
