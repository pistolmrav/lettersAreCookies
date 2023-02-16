import { Crumb } from '../types';
import readline from 'readline';
import chalk from 'chalk';
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

export function printIntro() {
  console.clear();
  console.log('--------------------------------------------------');
  console.log(
    chalk.red.bold('Monster woke up and felt crumbling in his tummy :(')
  );
  console.log('--------------------------------------------------');
  console.log(
    chalk.yellow.bold(
      'But since you are a good fella you leave crumb trail for the monster so he can get to his breakfast.'
    )
  );
  console.log('--------------------------------------------------');
}

export function checkMultipleSymbolsInLine(symbol: string, line: string) {
  let count = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === symbol) {
      count++;
      if (count > 1) {
        return true;
      }
    }
  }
  return false;
}
