import { resolve, parse } from "path";
import { stat, rm } from 'fs/promises';
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { WORK_PATH } from "./operations.js";
import { greenColor, lightblueColor } from './utils/redraw.js';

const INFO = (path) => lightblueColor('File ') + greenColor(path) + lightblueColor(' has been removed');

export const rmf = async (...newPath) => {
  try {
    const resolved = resolve(WORK_PATH.url, newPath[0].join(' '));
    if (parse(WORK_PATH.url).root === parse(resolved).root) {
      if ((await stat(resolved)).isFile()) {
        await rm(resolved);
        return INFO(resolved);
      }
      else throw new Error(ERROR_OPERATION_FAILED);
    }
  }
  catch {
    throw new Error(ERROR_OPERATION_FAILED);
  }
};