import { Controller, Get, Query } from '@nestjs/common';
import { BasicMathsService } from '../services/basic-maths.service';
import { GenerateAdditionsDto } from '../dtos/generate-additions.dto';

@Controller('api/basic-maths')
export class BasicMathsController {
  constructor(private readonly basicMathsService: BasicMathsService) {}

  @Get('additions')
  async getAdditions(@Query() generateAdditionsDto: GenerateAdditionsDto) {
    const response =
      await this.basicMathsService.additions(generateAdditionsDto);
    return response;
  }
}
