import readline from 'node:readline/promises';

export function createCliInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export async function promptUser(rl, question) {
  return (await rl.question(question)).trim();
}
