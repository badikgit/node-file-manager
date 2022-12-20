import { EOL, cpus, homedir, userInfo, arch } from "os";
import { ERROR_INDALID_INPUT, ERROR_OPERATION_FAILED } from "./constants.js";
import { lightblueColor } from './utils/redraw.js';

const AMOUNT_CPUS_STRING = lightblueColor("Overall amount of CPUS: ");

const osArgs = {
  "--EOL": () => JSON.stringify(EOL).replaceAll(/[",']/g,''),
  "--cpus": cpus,
  "--homedir": homedir,
  "--username": () => userInfo().username,
  "--architecture": arch
};

export const os = (...args) => {
  try {
    if (!args[0] || typeof osArgs[args[0]] !== 'function') throw ERROR_INDALID_INPUT;
    const result = osArgs[args[0]]();
    if (Array.isArray(result)) {
      delete result.times;
      console.log(AMOUNT_CPUS_STRING, result.length);
      return result.map((item) => ({
        Model: item.model,
        ['Clock rate']: (item.speed / 1000).toFixed(2) + ' GHz'
      }));
    };
    return result;
  }
  catch (error) {
    if (error === ERROR_INDALID_INPUT) throw new Error(ERROR_INDALID_INPUT);
    throw new Error(ERROR_OPERATION_FAILED);
  }
};
