import { EOL } from 'os';
import { parseArgs } from './args.js';
import { runCli } from './operations.js'
import { orangeBgColor, redBgColor } from './redraw.js';

const WELCOME_STRING = "Welcome to the File Manager, ";
const BYE_STRING = "Thank you for using File Manager, ";
const ERROR_STRING = "Argument --username is missed or empty";
const HINT_STRING = EOL + orangeBgColor(' HINT! ') +
  EOL + " The program is started by npm-script start in following way:" +
  EOL + " npm run start -- --username=your_username";

const getEmptyStringBy = (...strings) => {
  let size = 0;
  if (strings.length) {
    strings.forEach(string => {
      size += string.length;
    });
  }
  return ' '.repeat(size);
}

try {
  const { username } = parseArgs();
  if (!username) {
    throw new Error(ERROR_STRING);
  }

  console.log( orangeBgColor(getEmptyStringBy(' ', WELCOME_STRING, username, '! ')) + EOL +
                                orangeBgColor(' ', WELCOME_STRING, username, '! ') + EOL +
               orangeBgColor(getEmptyStringBy(' ', WELCOME_STRING, username, '! ')));

  process.on('exit', () => {
    console.log(EOL + orangeBgColor(getEmptyStringBy(' ', BYE_STRING, username, '! ')) + EOL +
                                       orangeBgColor(' ', BYE_STRING, username, '! ') + EOL +
                      orangeBgColor(getEmptyStringBy(' ', BYE_STRING, username, '! ')) + EOL);
  });
  process.on('SIGINT', () => process.exit);
  runCli();
} catch (error) {
  console.error(redBgColor(" ", error, " "));
  console.log(HINT_STRING);
  process.exit;
}