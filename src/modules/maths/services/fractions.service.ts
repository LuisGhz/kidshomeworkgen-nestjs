import { Injectable } from '@nestjs/common';
import { GenerateFrAdditionsDto } from '../dtos/fractions/generate-fr-additions.dto';
import { OpenAIService } from 'src/modules/openai/services/openai.service';
import { FrAdditionsRequestBuilder } from '../utils/builders/fractions/fr-addition-request-builder.util';
import { FrAdditionResponse } from '../models/fractions/fr-addition-response.model';
import { GenerateFrSubstractionsDto } from '../dtos/fractions/generate-fr-substractions.dto';
import { FrSubstractionsRequestBuilder } from '../utils/builders/fractions/fr-substractions-request-builder.util';
import { FrSubstractionsResponse } from '../models/fractions/fr-substractions-response.model';
import { GenerateFrMultiplicationsDto } from '../dtos/fractions/generate-fr-multiplications.dto';
import { FrMultiplicationsRequestBuilder } from '../utils/builders/fractions/fr-multiplications-request.builder';
import { FrMultiplicationResponse } from '../models/fractions/fr-multiplication-response.model';

@Injectable()
export class FractionsService {
  constructor(private readonly openAiService: OpenAIService) {}

  async additions(generateFrAdditionsDto: GenerateFrAdditionsDto) {
    const meesage = FrAdditionsRequestBuilder.buildMessages(
      generateFrAdditionsDto,
    );
    const schema = FrAdditionsRequestBuilder.buildSchema();
    const response =
      await this.openAiService.createCompletionWithJsonSchema<FrAdditionResponse>(
        meesage,
        schema,
      );
    const frAdditions = response.choices[0].message.parsed!;
    return frAdditions;
  }

  async substractions(generateFrSubstractionsDto: GenerateFrSubstractionsDto) {
    const meesage = FrSubstractionsRequestBuilder.buildMessages(
      generateFrSubstractionsDto,
    );
    const schema = FrSubstractionsRequestBuilder.buildSchema();
    const response =
      await this.openAiService.createCompletionWithJsonSchema<FrSubstractionsResponse>(
        meesage,
        schema,
      );
    const frAdditions = response.choices[0].message.parsed!;
    return frAdditions;
  }

  async multiplications(
    generateFrSubstractionsDto: GenerateFrMultiplicationsDto,
  ) {
    const meesage = FrMultiplicationsRequestBuilder.buildMessages(
      generateFrSubstractionsDto,
    );
    const schema = FrMultiplicationsRequestBuilder.buildSchema();
    const response =
      await this.openAiService.createCompletionWithJsonSchema<FrMultiplicationResponse>(
        meesage,
        schema,
      );
    const frAdditions = response.choices[0].message.parsed!;
    return frAdditions;
  }
}
