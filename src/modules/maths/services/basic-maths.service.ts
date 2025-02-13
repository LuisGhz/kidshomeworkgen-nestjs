import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/modules/openai/services/openai.service';
import { AdditionsResponse } from '../models/additions-response.model';

@Injectable()
export class BasicMathsService {
  constructor(private readonly openAiService: OpenAIService) {}

  async additions() {
    const messages = this.openAiService.createMessage([
      {
        role: 'system',
        content: 'Eres un maestro profesional de matematicas',
      },
      {
        role: 'user',
        content: `Devuelve 20 operaciones de suma`,
      },
    ]);

    const schema = this.openAiService.createJsonSchema({
      name: 'additions_response',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          additions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                firstAddend: {
                  type: 'number',
                },
                secondAddend: {
                  type: 'number',
                },
              },
              additionalProperties: false,
              required: ['firstAddend', 'secondAddend'],
            },
          },
        },
        additionalProperties: false,
        required: ['additions'],
      },
    });

    const response = await this.openAiService.createCompletionWithJsonSchmea(
      messages,
      schema,
    );
    const additions = JSON.parse(
      response.choices[0].message.content!,
    ) as AdditionsResponse;

    return additions;
  }
}
