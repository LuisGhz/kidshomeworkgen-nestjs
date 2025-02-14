import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { Logger } from '@nestjs/common';
import { GenerateMultiplicationsDto } from '../../dtos/generate-multiplications.dto';

export class MultiplicationsRequestBuilder {
  static buildMessages(
    generateAdditionsDto: GenerateMultiplicationsDto,
  ): ChatCompletionMessageParam[] {
    const quantityPerPage = 20;
    const quantity = generateAdditionsDto.pages * quantityPerPage;
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'Eres un maestro profesional de matematicas',
      },
      {
        role: 'user',
        content: `
        Devuelve ${quantity} operaciones de multiplicaciones las cuales deben de cumplir con todos y cada uno de los siguientes criterios:
        * Todos los numeros deben ser numeros enteros positivos.
        * El multiplicando debe de tener ${generateAdditionsDto.multiplicandDitis} digitos.
        * El multiplicador debe de tener ${generateAdditionsDto.multiplierDigits} digitos.
        * Las operaciones no deben contener decimales.
        * El multiplicando y el multiplicador no deben contener 0, por ejemplo: 6050 esta mal pero 6151 esta bien.
        * No se deben repetir muchas veces el mismo numero en el multiplicando o el multiplicador, por ejemplo: 888888 o 999999 estan mal, 44414 o 559000 estan mal.
        * Si el multiplicando y el multiplicador tienen la misma cantidad de digitos, el multiplicando debe de ser mayor al multiplicador.
        `,
      },
    ];
    Logger.log(messages);
    return messages;
  }

  static buildSchema(): ResponseFormatJSONSchema.JSONSchema {
    return {
      name: 'multiplications_response',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          multiplications: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                multiplicand: {
                  type: 'number',
                },
                multiplier: {
                  type: 'number',
                },
              },
              additionalProperties: false,
              required: ['multiplicand', 'multiplier'],
            },
          },
        },
        additionalProperties: false,
        required: ['multiplications'],
      },
    };
  }
}
