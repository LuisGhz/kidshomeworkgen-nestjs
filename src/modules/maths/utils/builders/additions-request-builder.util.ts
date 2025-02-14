import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { GenerateAdditionsDto } from '../../dtos/generate-additions.dto';
import { Logger } from '@nestjs/common';

export class AdditionsRequestBuilder {
  static buildMessages(
    generateAdditionsDto: GenerateAdditionsDto,
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
        Devuelve ${quantity} operaciones de suma las cuales deben de cumplir con todos y cada uno de los siguientes criterios:
        * Las operaciones deben de ser de dos sumandos.
        * Los sumandos deben ser numeros enteros positivos.
        * Los sumandos no deben ser 0.
        * El primer sumando debe de tener ${generateAdditionsDto.firstAddendDigits} digitos.
        * El segundo sumando debe de tener ${generateAdditionsDto.secondAddendDigits} digitos.
        * Si el primer sumando y el segundo sumando tienen la misma cantidad de digitos, el primer sumando debe de ser mayor al segundo sumando.
        * ${
          generateAdditionsDto.includeDecimals
            ? 'Los sumandos deben incluir decimales de dos digitos.'
            : 'Los sumandos no deben incluir decimales.'
        }
        `,
      },
    ];
    Logger.log(messages);
    return messages;
  }

  static buildSchema(): ResponseFormatJSONSchema.JSONSchema {
    return {
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
    };
  }
}
