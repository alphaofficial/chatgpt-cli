import { Configuration, OpenAIApi } from 'openai';

const { OPENAI_API_KEY } = process.env;

export class OpenAIClient {
  private configuration: Configuration;
  public openai: OpenAIApi;
  public cache: any;
  private apiKey: string = OPENAI_API_KEY;

  constructor() {
    this.init();
  }

  init() {
    this.configuration = new Configuration({
      apiKey: this.apiKey,
    });
    this.openai = new OpenAIApi(this.configuration);
  }
}
