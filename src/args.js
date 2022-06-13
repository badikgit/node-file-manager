import { argv } from "process";

const ERROR_STRING = "Invalid argument format: ";

export const parseArgs = () => {
  const args = argv.slice(2);
  const argsObject = {};

  for (let arg of args) {
    const [key, value] = arg.split`=`;
    if (!value || !key.startsWith`--`) throw new Error(`${ERROR_STRING}${key}`);
    argsObject[key.slice(2)] = value;
  };

  return argsObject;
}