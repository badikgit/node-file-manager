import { EOL } from 'os';
import { WELCOME, BYE, HINT_RUN, CURRENTLY } from './../constants.js';
import { redBgColor, orangeBgColor, greenBgColor, redColor, lightblueColor, orangeColor } from './redraw.js';

const getEmptyStringFrom = (...strings) => {
  let size = 0;
  if (strings.length) {
    strings.forEach(string => {
      size += string.length;
    });
  }
  return ' '.repeat(size);
}
const getWelcomeString = (username) => ` ${WELCOME}, ${username}! `;
const getByeString = (username) => ` ${BYE}, ${username}, goodbye! `;

const getRunHintMessage = (error) => redBgColor(" ", error, " ") + EOL + HINT_RUN + EOL;

export const showWelcomeMessage = (username) => {
  console.log(
    EOL,
    greenBgColor(getEmptyStringFrom(getWelcomeString(username))), EOL,
    greenBgColor(getWelcomeString(username)), EOL,
    greenBgColor(getEmptyStringFrom(getWelcomeString(username))), EOL
  );
};
export const showByeMessage = (username) => {
  console.log(
    EOL, EOL,
    orangeBgColor(getEmptyStringFrom(getByeString(username))), EOL,
    orangeBgColor(getByeString(username)), EOL,
    orangeBgColor(getEmptyStringFrom(getByeString(username))), EOL
  );
};

export const showRunHint = (error) => {
  console.log(getRunHintMessage(error))
};
export const showError = (error) => console.log(redColor(error));

export function getColoredPath(path) {
  return orangeColor(path);
}

export const showQuestion = (path) => CURRENTLY + getColoredPath(path) + EOL + "> ";

export const showOperationResult = (result) => {
  if (!result) return;
  if (Array.isArray(result)) console.table(result);
  else console.log(lightblueColor(result));
}
