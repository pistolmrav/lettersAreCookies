import { Crumb } from '../types';

export function isValidCrumb(crumb: Crumb): boolean {
  return crumb !== undefined && crumb !== ' ' && !!crumb.match(/[A-Z+-]/);
}
