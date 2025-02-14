import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { Logger } from '@nestjs/common';
import { GenerateDivisionsDto } from '../../dtos/basic-maths/generate-divisions.dto';

export class DivitionsRequestBuilder {
  static buildMessages(
    generateDivisionsDto: GenerateDivisionsDto,
  ): ChatCompletionMessageParam[] {
    const quantityPerPage = 20;
    const quantity = generateDivisionsDto.pages * quantityPerPage;
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'Eres un maestro profesional de matematicas',
      },
      {
        role: 'user',
        content: `
        Devuelve ${quantity} operaciones de divisiones las cuales deben de cumplir con todos y cada uno de los siguientes criterios:
        * Todos los numeros deben ser numeros enteros positivos.
        * El dividendo debe de tener ${generateDivisionsDto.dividendDigits} digitos.
        * El divisor debe de tener ${generateDivisionsDto.divisorDigits} digitos.
        * El dividendo y el divisor no deben contener 0, por ejemplo: 6050 esta mal pero 6151 esta bien.
        * No se deben repetir muchas veces el mismo numero en el dividendo o el divisor, por ejemplo: 888888 o 999999 estan mal, 44414 o 559000 estan mal.
        * Si el dividendo y el divisor tienen la misma cantidad de digitos, el dividendo debe de ser mayor al divisor.
        * Las divisiones ${generateDivisionsDto.canHaveRemainder ? 'deben' : 'no deben'} tener residuo.
        `,
      },
    ];
    Logger.log(messages);
    return messages;
  }

  static buildSchema(): ResponseFormatJSONSchema.JSONSchema {
    return {
      name: 'divisions_response',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          divisions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                dividend: {
                  type: 'number',
                },
                divisor: {
                  type: 'number',
                },
              },
              additionalProperties: false,
              required: ['dividend', 'divisor'],
            },
          },
        },
        additionalProperties: false,
        required: ['divisions'],
      },
    };
  }
}
