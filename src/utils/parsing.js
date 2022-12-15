import { OPERATIONS } from '../operations.js';
import { ERROR_INDALID_INPUT } from '../constants.js';

const checkAnswerValidation = (operation, args) => {
  console.info('checkAnswerValidation', operation, args);
  if (operation) {
    if (!OPERATIONS[operation] || args.length !== OPERATIONS[operation].argsCount) {
      throw new Error(ERROR_INDALID_INPUT);
    }
  }
}

export function parseAnswer(answer) {
  console.info('parseAnswer');
  const answerArray = answer
    .split` `
    .map(item => item.trim())
    .filter(item => item !== "");
  const { operation, args } = {
    operation: answerArray[0],
    args: answerArray.slice(1),
  };
  checkAnswerValidation(operation, args);
  return { operation, args };
};
