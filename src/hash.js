import { resolve, parse } from "path";
import { stat, readFile } from 'fs/promises';
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { WORK_PATH } from "./operations.js";
import { greenColor, lightblueColor, reset } from './utils/redraw.js';
import { createHash } from 'crypto';

const INFO = (path, hash) => lightblueColor('Hash of file ') + greenColor(path) + lightblueColor(' is ') + reset(hash);

export const hash = async (...newPath) => {
  try {
    const resolved = resolve(WORK_PATH.url, newPath[0].join(' '));
    if (parse(WORK_PATH.url).root === parse(resolved).root) {
      if ((await stat(resolved)).isFile()) {
        const data = await readFile(resolved, { encoding: 'utf8' });
        const hash = createHash('sha256').update(data).digest('hex');
        return INFO(resolved, hash);
      }
      else throw new Error(ERROR_OPERATION_FAILED);
    }
  }
  catch {
    throw new Error(ERROR_OPERATION_FAILED);
  }
};