import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { Logger } from '@nestjs/common';
import { GenerateFrMultiplicationsDto } from 'src/modules/maths/dtos/fractions/generate-fr-multiplications.dto';

export class FrMultiplicationsRequestBuilder {
  static buildMessages(
    generateFrAdditionsDto: GenerateFrMultiplicationsDto,
  ): ChatCompletionMessageParam[] {
    const quantityPerPage = 15;
    const quantity = generateFrAdditionsDto.pages * quantityPerPage;
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'Eres un maestro profesional de matematicas',
      },
      /**
       * @todo Contemplar para futuras modificaciones las fracciones impropias
       */
      {
        role: 'user',
        content: `
        Devuelve ${quantity} operaciones de multiplicaciones de fracciones las cuales deben de cumplir con todos y cada uno de los siguientes criterios:
        * Los numeros de las fracciones no deben ser 0.
        * ${generateFrAdditionsDto.canHaveWholes ? 'El 50% de las multiplicaciones deben contener fracciones mixtas, ambas fracciones pueden ser mixtas o solo una de ellas.' : 'Las fracciones no deben ser mixtas'}.
        * ${FrMultiplicationsRequestBuilder.buildDenominatorsTypesRules(generateFrAdditionsDto)}.
        * Las fracciones deben ser propias.
        * Las fracciones deben ser diferentes entre si en las ${quantity} multiplicaciones.
        * Las fracciones podrán ser hasta de 2 dígitos.
        * Para las fracciones que no sean mixtas, los enteros deben ser 0.
        `,
      },
    ];
    Logger.log(messages);
    return messages;
  }

  private static buildDenominatorsTypesRules(
    generateFrAdditionsDto: GenerateFrMultiplicationsDto,
  ) {
    switch (generateFrAdditionsDto.denominatorsType) {
      case 'same':
        return 'El 100% de las fracciones deben ser con el mismo denominador.';
      case 'different':
        return 'El 100% de las fracciones deben ser con diferente denominador.';
      case 'mixed':
        return 'El 50% de las fracciones deben ser con el mismo denominador y el otro 50% deben ser con diferente denominador.';
      default:
        return '';
    }
  }

  static buildSchema(): ResponseFormatJSONSchema.JSONSchema {
    return {
      name: 'fr_multiplications_response',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          multiplications: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                firstWhole: {
                  type: 'number',
                },
                firstNumerator: {
                  type: 'number',
                },
                firstDenominator: {
                  type: 'number',
                },
                secondWhole: {
                  type: 'number',
                },
                secondNumerator: {
                  type: 'number',
                },
                secondDenominator: {
                  type: 'number',
                },
              },
              additionalProperties: false,
              required: [
                'firstWhole',
                'firstNumerator',
                'firstDenominator',
                'secondWhole',
                'secondNumerator',
                'secondDenominator',
              ],
            },
          },
        },
        additionalProperties: false,
        required: ['multiplications'],
      },
    };
  }
}
