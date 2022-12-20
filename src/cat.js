import { resolve, parse } from "path";
import { stat, realpath, readFile } from 'fs/promises';
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { WORK_PATH } from "./operations.js";
import { greenColor, lightblueColor } from './utils/redraw.js';

const INFO_START_CUT = (path) => lightblueColor('Reading file: ') + greenColor(path);

export const cat = async (...pathToFile) => {
  try {
    const resolved = await realpath(resolve(WORK_PATH.url, pathToFile[0].join(' ')));
    if (parse(WORK_PATH.url).root === parse(resolved).root) {
      if ((await stat(resolved)).isFile()) {
        const content = await readFile(resolved, { encoding: 'utf8' });
        console.log(INFO_START_CUT(resolved));
        return content;
      }
      else throw new Error(ERROR_OPERATION_FAILED);
    }
  }
  catch {
    throw new Error(ERROR_OPERATION_FAILED);
  }
};
