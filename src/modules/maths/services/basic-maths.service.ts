import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/modules/openai/services/openai.service';
import { AdditionsResponse } from '../models/additions-response.model';
import { AdditionsRequestBuilder } from '../utils/builders/additions-request-builder.util';
import { GenerateAdditionsDto } from '../dtos/generate-additions.dto';

@Injectable()
export class BasicMathsService {
  constructor(private readonly openAiService: OpenAIService) {}

  async additions(generateAdditionsDto: GenerateAdditionsDto) {
    const messages =
      AdditionsRequestBuilder.buildMessages(generateAdditionsDto);
    const schema = AdditionsRequestBuilder.buildSchema();

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
