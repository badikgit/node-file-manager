import { EOL } from 'os';
import { orangeBgColor, greenColor } from './utils/redraw.js';

export const ERROR_ARGUMENT_FORMAT = "Invalid argument format";
export const ERROR_INDALID_INPUT = "Invalid input";
export const ERROR_OPERATION_FAILED = "Operation failed";
export const ERROR_RUN = "Argument --username is missed or empty";
export const WELCOME = "Welcome to the File Manager";
export const BYE = "Thank you for using File Manager";
export const HINT_RUN = EOL + orangeBgColor(' HINT! ') +
  EOL + " The program is started by npm-script start in following way:" +
  EOL + " npm run start -- --username=your_username";
export const CURRENTLY = greenColor(EOL + "You are currently in ");