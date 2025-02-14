import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { Logger } from '@nestjs/common';
import { GenerateSubstractionsDto } from '../../dtos/basic-maths/generate-substractions.dto';

export class SubstractionsRequestBuilder {
  static buildMessages(
    generateAdditionsDto: GenerateSubstractionsDto,
  ): ChatCompletionMessageParam[] {
    const quantityPerPage = 30;
    const quantity = generateAdditionsDto.pages * quantityPerPage;
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'Eres un maestro profesional de matematicas',
      },
      {
        role: 'user',
        content: `
        Devuelve ${quantity} operaciones de resta las cuales deben de cumplir con todos y cada uno de los siguientes criterios:
        * Todos los numeros deben ser numeros enteros positivos.
        * El minuendo debe de tener ${generateAdditionsDto.minuendDigits} digitos.
        * El sustraendo debe de tener ${generateAdditionsDto.subtrahendDigits} digitos.
        * El minuendo y el sustraendo no deben de tener decimales.
        * El minuendo y el sustraendo no deben contener 0, por ejemplo: 6050 esta mal pero 6151 esta bien.
        * No se deben repetir muchas veces el mismo numero en el minuendo o el sustraendo, por ejemplo: 888888 o 999999 estan mal, 44414 o 559000 estan mal.
        * Si el minuendo y el sustraendo tienen la misma cantidad de digitos, el minuendo debe de ser mayor al sustraendo.
        `,
      },
    ];
    Logger.log(messages);
    return messages;
  }

  static buildSchema(): ResponseFormatJSONSchema.JSONSchema {
    return {
      name: 'substractions_response',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          substractions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                minuend: {
                  type: 'number',
                },
                subtrahend: {
                  type: 'number',
                },
              },
              additionalProperties: false,
              required: ['minuend', 'subtrahend'],
            },
          },
        },
        additionalProperties: false,
        required: ['substractions'],
      },
    };
  }
}
