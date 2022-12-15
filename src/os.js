import { EOL, cpus, homedir, userInfo, arch } from "os";
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
    throw new Error(error);
  }
};
