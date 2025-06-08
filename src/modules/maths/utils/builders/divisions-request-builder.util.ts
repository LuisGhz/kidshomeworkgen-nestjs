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
        * Todas y cada una de las multiplicaciones deben ser únicas.
        * Las operaciones no deben ir con consecutivos, por ejemplo:
            12345 / 112, 54321 / 113.
            El "12345" esta mal porque ningún numero debe ser consecutivo, el "112" y "113" están mal porque las diferentes operaciones no deben ser consecutivos de otras.
        * Las diferentes opecaciones no deben ser muy parecidas, por ejemplo:
            49123 / 221, 34197 / 121, 84719 / 331,
            Los tres divisores son parecidos ya que los tres terminan con 1 y se generaron uno justo despues del otro.
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
