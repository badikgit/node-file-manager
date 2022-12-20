import { parseArgs } from './utils/args.js';
import { showByeMessage, showRunHint, showWelcomeMessage } from './utils/messages.js';
import { runCli } from './operations.js';
import { ERROR_RUN } from './constants.js';

try {
  const { username } = parseArgs();
  if (!username) {
    throw new Error(ERROR_RUN);
  }
  showWelcomeMessage(username);
  process.on('exit', () => showByeMessage(username));
  process.on('SIGINT', () => process.exit);
  runCli();
} catch (error) {
  showRunHint(error);
  process.exit();
}