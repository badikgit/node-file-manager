import { argv } from "process";
import { ERROR_ARGUMENT_FORMAT } from './../constants.js';

export const parseArgs = () => {
  const args = argv.slice(2);
  const argsObject = {};

  for (let arg of args) {
    const [key, value] = arg.split`=`;
    if (!value || !key.startsWith`--`) throw new Error(`${ERROR_ARGUMENT_FORMAT}: ${key}`);
    argsObject[key.slice(2)] = value;
  };

  return argsObject;
}