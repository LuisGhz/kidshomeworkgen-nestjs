import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ChatModel,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { ChatCompletionParseParams } from 'openai/resources/chat/completions';

type AllowedChatModels = Extract<ChatModel, 'gpt-4o' | 'gpt-4o-mini'>;

@Injectable()
export class OpenAIService {
  private readonly apiKey: string = process.env.OPENAI_API_KEY!;
  private readonly client = new OpenAI({
    apiKey: this.apiKey,
  });

  createMessage(messages: ChatCompletionMessageParam[]) {
    return messages;
  }

  createJsonSchema(schema: ResponseFormatJSONSchema.JSONSchema) {
    return schema;
  }

  async createCompletionWithJsonSchema<R = any>(
    messages: Array<ChatCompletionMessageParam>,
    json_schema: ResponseFormatJSONSchema.JSONSchema,
    model: AllowedChatModels = 'gpt-4o',
  ) {
    return await this.client.chat.completions.parse<
      ChatCompletionParseParams,
      R
    >({
      model,
      messages,
      response_format: {
        type: 'json_schema',
        json_schema: json_schema,
      },
    });
  }
}
