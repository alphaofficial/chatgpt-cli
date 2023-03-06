import chalk from 'chalk';
import inquirer from 'inquirer';
import { OpenAIClient } from './initialize-openai';

export const handleInteraction = async (
  message = 'How can i help you today?',
  type = 'input',
) => {
  try {
    const client = new OpenAIClient();
    const answers = await inquirer.prompt([
      {
        name: 'prompt',
        type,
        message,
      },
    ]);

    if (type === 'confirm' && !answers.prompt) return console.log('Bye!');
    else if (type === 'confirm' && answers.prompt) {
      return handleInteraction();
    }
    const { prompt: userPrompt } = answers;
    console.log('...\n');
    const completion = await client.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userPrompt }],
    });
    console.log(
      `${chalk.cyan(completion.data.choices[0].message.content)}\n\n`,
    );

    handleInteraction('Anything else?', 'confirm');
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};
