import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { homedir } from 'os';
import { os } from './os.js';
import { ls } from './ls.js';
import { showError, showQuestion, getColoredPath, showOperationResult } from './utils/messages.js';
import { parseAnswer } from './utils/parsing.js';

export let WORK_PATH = homedir();

export const OPERATIONS = {
  up: {
    argsCount: 0,
    func: () => console.info("run up"),
  },
  cd: {
    argsCount: 1,
    func: () => console.info("run cd"),
  },
  ls: {
    argsCount: 0,
    func: () => {
      return ls()
    },
  },
  cat: {
    argsCount: 1,
    func: () => console.info("run ls"),
  },
  add: {
    argsCount: 1,
    func: () => console.info("run add"),
  },
  rn: {
    argsCount: 1,
    func: () => console.info("run rn"),
  },
  cp: {
    argsCount: 2,
    func: () => console.info("run cp"),
  },
  mv: {
    argsCount: 2,
    func: () => console.info("run mv"),
  },
  os: {
    argsCount: 1,
    func: (operation) => {
      return os(operation)
    },
  },
  hash: {
    argsCount: 1,
    func: () => console.info("run hash"),
  },
  compress: {
    argsCount: 2,
    func: () => console.info("run compress"),
  },
  decompress: {
    argsCount: 2,
    func: () => console.info("run decompress"),
  }
};


const readlineStream = readline.createInterface({ input, output });

const startOperations = async (answer) => {
  try {
    if (!answer) return;
    const { operation, args } = parseAnswer(answer);
    const result = await OPERATIONS[operation].func(...args);
    showOperationResult(result);
  } catch (error) {
    showError(error);
  }
};

export const runCli = () => {
  readlineStream.question(showQuestion(getColoredPath(WORK_PATH)), async answer => {
    if (answer.length) answer = answer.trim();
    if (answer === '.exit') {
      process.exit();
    } else {
      await startOperations(answer);
    }
    runCli();
  });
}