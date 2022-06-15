import { orangeColor, greenColor, lightblueColor, redColor } from './redraw.js';
import { os } from './os.js';
import { EOL, homedir } from 'os';
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';

const CURRENTLY_LACATION_TEXT = greenColor(EOL + "You are currently in ");
const INDALID_STRING = "Invalid input";
const OPERATIONS_ARGUMENTS = {
  up: 1,
  cd: 2,
  ls: 1,
  cat: 2,
  add: 2,
  rn: 2,
  cp: 3,
  mv: 3,
  os: 2,
  hash: 2,
  compress: 3,
  decompress: 3
};

const OPERATIONS = {
  up: 1,
  cd: 2,
  ls: (operation) => ls(operation),
  cat: 2,
  add: 2,
  rn: 2,
  cp: 3,
  mv: 3,
  os: (operation) => os(operation),
  hash: 2,
  compress: 3,
  decompress: 3
};

let workDirectiryPath = orangeColor(homedir());
const readlineStream = readline.createInterface({ input, output });

const checkOperationArgsCount = (operation) => {
  if (OPERATIONS_ARGUMENTS[operation[0]] !== operation.length) {
    throw new Error(INDALID_STRING);
  }
}

const startOperations = async (answer) => {
  const operation = answer
    .split` `
    .map(item => item.trim())
    .filter(item => item !== "");
  try {
    checkOperationArgsCount(operation);
    const result = await OPERATIONS[operation[0]](operation);
    if (Array.isArray(result)) console.table(result);
    else console.log(lightblueColor(result));
  } catch (error) {
    console.error(redColor(error));
  }
};

export const runCli = () => {
  readlineStream.question(CURRENTLY_LACATION_TEXT + workDirectiryPath + EOL + "> ", async answer => {
    if (answer.length) answer = answer.trim();
    if (answer === '.exit') {
      process.exit();
    } else {
      await startOperations(answer);
    }
    runCli();
  });
}