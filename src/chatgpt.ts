import 'dotenv-defaults/config';
import { program } from 'commander';
import { handleInteraction } from './handle-interaction';
import chalk from 'chalk';
import { exec } from 'child_process';

const { OPENAI_API_KEY } = process.env;

program
  .description('Start a conversation with GPT-3')
  .version('1.0.0', '-v, --version')
  .option('-k, --apiKey <apiKey>', 'OpenAI API key')
  .parse(process.argv);

const options = program.opts();
const apiKey = options.apiKey || OPENAI_API_KEY;
if (apiKey) {
  exec(`export OPENAI_API_KEY=${apiKey}`);
  handleInteraction();
} else if (!OPENAI_API_KEY) {
  console.log(
    chalk.red(
      'No OPENAI_API_KEY found in your environment variables. Please provide an API key using the --api-key flag or by setting the OPENAI_API_KEY environment variable',
    ),
  );
}
