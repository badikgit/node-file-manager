import { sep } from "path";
import { realpath } from 'fs/promises';
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { WORK_PATH } from "./operations.js";

export const up = async () => {
  try {
    WORK_PATH.url = await realpath(WORK_PATH.url
      .split(sep)
      .slice(0, WORK_PATH.url.split(sep).length > 1 ? -1 : 1)
      .join(sep));
  }
  catch (error) {
    throw new Error(ERROR_OPERATION_FAILED);
  }
};