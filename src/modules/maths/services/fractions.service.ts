import { Injectable } from '@nestjs/common';
import { GenerateFrAdditionsDto } from '../dtos/fractions/generate-fr-additions.dto';
import { OpenAIService } from 'src/modules/openai/services/openai.service';
import { FrAdditionsRequestBuilder } from '../utils/builders/fractions/fr-addition-request-builder.util';
import { FrAdditionResponse } from '../models/fractions/fr-addition-response.model';
import { GenerateFrSubstractionsDto } from '../dtos/fractions/generate-fr-substractions.dto';
import { FrSubstractionsRequestBuilder } from '../utils/builders/fractions/fr-substractions-request-builder.util';
import { FrSubstractionsResponse } from '../models/fractions/fr-substractions-response.model';

@Injectable()
export class FractionsService {
  constructor(private readonly openAiService: OpenAIService) {}

  async additions(generateFrAdditionsDto: GenerateFrAdditionsDto) {
    const meesage = FrAdditionsRequestBuilder.buildMessages(
      generateFrAdditionsDto,
    );
    const schema = FrAdditionsRequestBuilder.buildSchema();
    const response = await this.openAiService.createCompletionWithJsonSchema(
      meesage,
      schema,
    );
    const frAdditions = JSON.parse(
      response.choices[0].message.content!,
    ) as FrAdditionResponse;
    return frAdditions;
  }

  async substractions(generateFrSubstractionsDto: GenerateFrSubstractionsDto) {
    const meesage = FrSubstractionsRequestBuilder.buildMessages(
      generateFrSubstractionsDto,
    );
    const schema = FrSubstractionsRequestBuilder.buildSchema();
    const response = await this.openAiService.createCompletionWithJsonSchema(
      meesage,
      schema,
    );
    const frAdditions = JSON.parse(
      response.choices[0].message.content!,
    ) as FrSubstractionsResponse;
    return frAdditions;
  }
}
