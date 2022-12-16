import { resolve, parse } from "path";
import { stat, realpath } from 'fs/promises';
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { WORK_PATH } from "./operations.js";

export const cd = async (...newPath) => {
  try {
    const resolved = await realpath(resolve(WORK_PATH.url, newPath[0].join(' ')));
    if (parse(WORK_PATH.url).root === parse(resolved).root) {
      if ((await stat(resolved)).isDirectory()) {
        WORK_PATH.url = resolved;
      }
      else throw new Error(ERROR_OPERATION_FAILED);
    }
  }
  catch {
    throw new Error(ERROR_OPERATION_FAILED);
  }
};