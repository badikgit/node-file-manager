import { writeFile } from "fs";
import { access } from 'fs/promises';
import { resolve, parse } from "path";
import { WORK_PATH } from "./operations.js";
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { greenColor, lightblueColor, reset } from './utils/redraw.js';

const INFO_CREATE_FILE = (path) => reset("File ") + greenColor(parse(path).base) + " was created in " + lightblueColor(parse(path).dir);

export const add = async (...args) => {
  try {
    const fileName = args[0].join(' ');
    '/\\|:*?><"'.split('').forEach((char) => {
      if (fileName.includes(char)) throw new Error(ERROR_OPERATION_FAILED);
    });
    const resolved = resolve(WORK_PATH.url, fileName);
    if (parse(WORK_PATH.url).root === parse(resolved).root) {
      await access(resolved);
      throw new Error(ERROR_OPERATION_FAILED);
    }
    else {
      throw new Error(ERROR_OPERATION_FAILED);
    }
  }
  catch (error) {
    if (error.code === 'ENOENT') {
      try {
        const fileName = args[0].join(' ');
        const resolved = resolve(WORK_PATH.url, fileName);
        writeFile(resolved, '', (err) => {
          if (!err) return;
          throw new Error(ERROR_OPERATION_FAILED);
        });
        return (INFO_CREATE_FILE(resolved));
      } catch (error) {
        console.log('writeFile catch', error);
        if (error.message === ERROR_OPERATION_FAILED) throw new Error(ERROR_OPERATION_FAILED);
        throw new Error(ERROR_OPERATION_FAILED);
      }
    }
    if (error.message === ERROR_OPERATION_FAILED) throw new Error(ERROR_OPERATION_FAILED);
  }
};