import { readdir, stat, realpath } from 'fs/promises';
import { resolve } from "path";
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { WORK_PATH } from "./operations.js";
import { greenColor, lightblueColor } from './utils/redraw.js';


const LiST_STRING = () => lightblueColor('Directory of ') + greenColor(WORK_PATH.url);

export const ls = async () => {
  try {
    if ((await stat(WORK_PATH.url)).isDirectory()) {
      console.log(LiST_STRING());
      const result = await readdir(WORK_PATH.url, { withFileTypes: true });
      const results = result.map((item) => {
        const newItem = ({
          Name: item.name,
          Type: item.isFile() ? 'file' : item.isDirectory() ? 'directory' : item.isSymbolicLink() ? 'symbolic link' : undefined,
        });
        return newItem;
      });
      return results.sort((a, b) => a.Type < b.Type ? -1 : 0);
    }
  }
  catch {
    throw new Error(ERROR_OPERATION_FAILED);
  }
};
