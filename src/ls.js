import { readdir } from 'fs/promises';
import { ERROR_OPERATION_FAILED } from "./constants.js";
import { WORK_PATH } from "./operations.js";
import { greenColor, lightblueColor } from './utils/redraw.js';


const LiST_STRING = (path) => lightblueColor('Directory of ') + greenColor(path);

export const ls = async () => {
  try {
    console.log(LiST_STRING(WORK_PATH.url));
    const results = await readdir(WORK_PATH.url, { withFileTypes: true });
    return results
      .map((item) => ({
        Name: item.name,
        Type: item.isDirectory() ? 'directory' : item.isSymbolicLink() ? 'symbolic link' : 'file',
      }))
      .sort((a, b) => a.Type < b.Type ? -1 : 0);
  }
  catch {
    throw new Error(ERROR_OPERATION_FAILED);
  }
};
