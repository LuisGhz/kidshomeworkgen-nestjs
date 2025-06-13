import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { Logger } from '@nestjs/common';
import { GenerateMultiplicationsDto } from '../../dtos/basic-maths/generate-multiplications.dto';

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
        * El multiplicando debe de tener ${generateAdditionsDto.multiplicandDigits} digitos.
        * El multiplicador debe de tener ${generateAdditionsDto.multiplierDigits} digitos.
        * Las operaciones no deben contener decimales.
        * Ni el multiplicando o el multiplicador no deben contener 0, por ejemplo: 6050 esta mal pero 6151 esta bien.
        * No se debe repetir más de dos veces el mismo numero en el multiplicando o el multiplicador, por ejemplo: 888888 o 999999 estan mal, 4414 o 55911 estan mal.
        * Si el multiplicando y el multiplicador tienen la misma cantidad de digitos, el multiplicando debe de ser mayor al multiplicador.
        * Todas y cada una de las multiplicaciones deben ser únicas.
        * Las operaciones no deben ir con consecutivos, por ejemplo:
            12345 X 112, 54321 X 113.
            El "12345" esta mal porque ningún numero debe ser consecutivo, el "112" y "113" están mal porque las diferentes operaciones no deben ser consecutivos de otras.
        * Las diferentes opecaciones no deben ser muy parecidas, por ejemplo:
            49123 X 221, 34197 X 121, 84719 X 331,
            Los tres multiplicados son parecidos ya que los tres terminan con 1 y se generaron uno justo despues del otro.
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
