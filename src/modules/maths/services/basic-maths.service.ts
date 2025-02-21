import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from 'src/modules/openai/services/openai.service';
import { AdditionsResponse } from '../models/basic-maths/additions-response.model';
import { AdditionsRequestBuilder } from '../utils/builders/additions-request-builder.util';
import { GenerateAdditionsDto } from '../dtos/basic-maths/generate-additions.dto';
import { GenerateSubstractionsDto } from '../dtos/basic-maths/generate-substractions.dto';
import { SubstractionsRequestBuilder } from '../utils/builders/substractions-request-builder.util';
import { GenerateMultiplicationsDto } from '../dtos/basic-maths/generate-multiplications.dto';
import { MultiplicationsRequestBuilder } from '../utils/builders/multiplications-request.builder.util';
import { GenerateDivisionsDto } from '../dtos/basic-maths/generate-divisions.dto';
import { DivitionsRequestBuilder } from '../utils/builders/divisions-request-builder.util';
import { DivisionsResponse } from '../models/basic-maths/divisions-response.model';
import { SubstractionsResponse } from '../models/basic-maths/susbtracions-response.model';
import { MultiplicationsResponse } from '../models/basic-maths/multiplications-response.model';

@Injectable()
export class BasicMathsService {
  private readonly logger = new Logger(BasicMathsService.name);
  constructor(private readonly openAiService: OpenAIService) {}

  async additions(generateAdditionsDto: GenerateAdditionsDto) {
    const messages =
      AdditionsRequestBuilder.buildMessages(generateAdditionsDto);
    const schema = AdditionsRequestBuilder.buildSchema();

    const response = await this.openAiService.createCompletionWithJsonSchema(
      messages,
      schema,
    );
    this.logger.log(response.choices[0].message.content);
    const additions = JSON.parse(
      response.choices[0].message.content!,
    ) as AdditionsResponse;
    this.logger.log(additions);
    return additions;
  }

  async substractions(generateSubstractionsDto: GenerateSubstractionsDto) {
    const messages = SubstractionsRequestBuilder.buildMessages(
      generateSubstractionsDto,
    );
    const schema = SubstractionsRequestBuilder.buildSchema();

    const response = await this.openAiService.createCompletionWithJsonSchema(
      messages,
      schema,
    );
    const additions = JSON.parse(
      response.choices[0].message.content!,
    ) as SubstractionsResponse;

    return additions;
  }

  async multiplications(
    generateMultiplicationsDto: GenerateMultiplicationsDto,
  ) {
    const messages = MultiplicationsRequestBuilder.buildMessages(
      generateMultiplicationsDto,
    );
    const schema = MultiplicationsRequestBuilder.buildSchema();

    const response = await this.openAiService.createCompletionWithJsonSchema(
      messages,
      schema,
    );
    const additions = JSON.parse(
      response.choices[0].message.content!,
    ) as MultiplicationsResponse;

    return additions;
  }

  async divisions(generateDivitionsDto: GenerateDivisionsDto) {
    const messages =
      DivitionsRequestBuilder.buildMessages(generateDivitionsDto);
    const schema = DivitionsRequestBuilder.buildSchema();

    const response = await this.openAiService.createCompletionWithJsonSchema(
      messages,
      schema,
    );
    const divisions = JSON.parse(
      response.choices[0].message.content!,
    ) as DivisionsResponse;

    return divisions;
  }
}
