import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
  prompt: jest.fn().mockResolvedValue({ prompt: 'Hello' }),
}));

jest.mock('chalk', () => ({
  red: jest.fn().mockImplementation((message) => message),
  cyan: jest.fn().mockImplementation((message) => message),
}));

jest.mock('../initialize-openai', () => ({
  OpenAIClient: function () {
    return {
      init: jest.fn(),
      openai: {
        createChatCompletion: () => ({
          data: {
            choices: [
              {
                message: {
                  content: 'Hello',
                },
              },
            ],
          },
        }),
      },
    };
  },
}));

describe('handleInteraction', () => {
  it('should call prompt', async () => {
    const { handleInteraction } = await import('../handle-interaction');
    await handleInteraction();
    expect(inquirer.prompt).toHaveBeenCalled();
  });

  it('should call prompt with correct arguments', async () => {
    const { handleInteraction } = await import('../handle-interaction');
    await handleInteraction('How can I help you today?', 'input');
    expect(inquirer.prompt).toHaveBeenCalledWith([
      {
        name: 'prompt',
        type: 'input',
        message: 'How can I help you today?',
      },
    ]);

    await handleInteraction('Anything else?', 'confirm');
    expect(inquirer.prompt).toHaveBeenCalledWith([
      {
        name: 'prompt',
        type: 'confirm',
        message: 'Anything else?',
      },
    ]);
  });
});
