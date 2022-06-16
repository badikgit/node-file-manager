import { EOL, cpus, homedir, userInfo, arch } from "os";
import { lightblueColor } from './redraw.js';
const AMOUNT_CPUS_STRING = lightblueColor("Overall amount of CPUS: ");
const INDALID_STRING = "Invalid input";

const osArgs = {
  "--EOL": () => JSON.stringify(EOL).replaceAll(/[",']/g,''),
  "--cpus": cpus,
  "--homedir": homedir,
  "--username": () => userInfo().username,
  "--architecture": arch
};

export const os = (operation) => {
  if (!osArgs[operation[1]]) throw new Error(INDALID_STRING);
  const result = osArgs[operation[1]]();
  if (Array.isArray(result)) {
    delete result.times;
    console.log(AMOUNT_CPUS_STRING, result.length);
    return result.map((item) => ({
      model: item.model,
      ['clock rate']: (item.speed / 1000).toFixed(2) + ' GHz'
    }));
  };
  return result;
};
