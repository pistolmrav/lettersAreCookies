import { Crumb } from '../types';
import readline from 'readline';

export function isValidCrumb(crumb: Crumb): boolean {
  return crumb !== undefined && crumb !== ' ' && !!crumb.match(/[A-Z+-|]/);
}

export function isLetter(crumb: Crumb): boolean {
  return crumb !== undefined && crumb !== ' ' && !!crumb.match(/[A-Z]/);
}

export async function delay(time: number): Promise<void> {
  return new Promise((resolve: any, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function askQuestion(query: any) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}
