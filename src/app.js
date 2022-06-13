import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { parseArgs } from './args.js';
import { EOL } from 'os';

const readlineStream = readline.createInterface( { input, output } );
const WELCOME_STRING = "Welcome to the File Manager, ";
const BYE_STRING = "Thank you for using File Manager, ";
const ERROR_STRING = "Argument --username is missed or empty";
const HINT_STRING = `${EOL}\x1b[43m\x1b[30m HINT! \x1b[0m${EOL} The program is started by npm-script start in following way:${EOL} npm run start -- --username=your_username `;

try {
  const { username } = parseArgs();
  if (!username) {
    throw new Error(ERROR_STRING);
  }

  console.log(`\x1b[7m\x1b[33m${' '.repeat(WELCOME_STRING.length + 3 + username.length)}${EOL} ${WELCOME_STRING}${username}! \x1b[0m${EOL}\x1b[7m\x1b[33m${' '.repeat(WELCOME_STRING.length + 3 + username.length)}${EOL}\x1b[0m`);
  readlineStream.on('line', line => {
    if (line === '.exit') {
      readlineStream.close();
    } else {
      console.log(line);
    }
  });
  readlineStream.on('SIGINT', () => readlineStream.close());
  readlineStream.on('close', () => {
    console.log(`${EOL}\x1b[7m\x1b[33m${' '.repeat(BYE_STRING.length + 3 + username.length)}${EOL} ${BYE_STRING}${username}! \x1b[0m${EOL}\x1b[7m\x1b[33m${' '.repeat(BYE_STRING.length + 3 + username.length)}${EOL}\x1b[0m`);
  });
} catch (error) {
  console.error(`\x1b[41m\x1b[37m ${error} \x1b[0m`);
  console.log(`${HINT_STRING} \x1b[0m`);
  process.exit(0);
}