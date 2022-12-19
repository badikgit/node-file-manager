import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { homedir } from 'os';
import { add } from './add.js';
import { cat } from './cat.js';
import { cd } from './cd.js';
import { ls } from './ls.js';
import { os } from './os.js';
import { up } from './up.js';
import { showError, showQuestion, getColoredPath, showOperationResult } from './utils/messages.js';
import { parseAnswer } from './utils/parsing.js';

export const WORK_PATH = {
  url: homedir(),
};

export const OPERATIONS = {
  up: {
    argsCount: 0,
    func: () => up(),
  },
  cd: {
    argsCount: 1,
    func: (...newPath) => cd(newPath),
  },
  ls: {
    argsCount: 0,
    func: () => ls(),
  },
  cat: {
    argsCount: 1,
    func: async (...pathToFile) => await cat(pathToFile),
  },
  add: {
    argsCount: 1,
    func: async (...fileName) => await add(fileName),
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
    func: (arg) => os(arg),
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
  readlineStream.question(showQuestion(getColoredPath(WORK_PATH.url)), async answer => {
    if (answer.length) answer = answer.trim();
    if (answer === '.exit') {
      process.exit();
    } else {
      await startOperations(answer);
    }
    runCli();
  });
}