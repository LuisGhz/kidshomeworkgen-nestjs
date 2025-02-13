import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ChatModel,
  ResponseFormatJSONSchema,
} from 'openai/resources';

@Injectable()
export class OpenAIService {
  private readonly apiKey: string = process.env.OPENAI_API_KEY!;
  private readonly model: ChatModel = 'gpt-4o-mini';
  private readonly client = new OpenAI({
    apiKey: this.apiKey,
  });

  createMessage(messages: ChatCompletionMessageParam[]) {
    return messages;
  }

  createJsonSchema(schema: ResponseFormatJSONSchema.JSONSchema) {
    return schema;
  }

  async createCompletionWithJsonSchmea(
    messages: ChatCompletionMessageParam[],
    json_schema: ResponseFormatJSONSchema.JSONSchema,
  ) {
    return await this.client.chat.completions.create({
      model: this.model,
      messages,
      response_format: {
        type: 'json_schema',
        json_schema: json_schema,
      },
    });
  }
}
