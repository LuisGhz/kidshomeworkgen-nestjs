import { Controller, Get, Query } from '@nestjs/common';
import { BasicMathsService } from '../services/basic-maths.service';
import { GenerateAdditionsDto } from '../dtos/generate-additions.dto';
import { GenerateSubstractionsDto } from '../dtos/generate-substractions.dto';
import { GenerateMultiplicationsDto } from '../dtos/generate-multiplications.dto';
import { GenerateDivisionsDto } from '../dtos/generate-divisions.dto';

@Controller('api/basic-maths')
export class BasicMathsController {
  constructor(private readonly basicMathsService: BasicMathsService) {}

  @Get('additions')
  async getAdditions(@Query() generateAdditionsDto: GenerateAdditionsDto) {
    const response =
      await this.basicMathsService.additions(generateAdditionsDto);
    return response;
  }

  @Get('substractions')
  async getSubstractions(
    @Query() generateSubstractionsDto: GenerateSubstractionsDto,
  ) {
    const response = await this.basicMathsService.substractions(
      generateSubstractionsDto,
    );
    return response;
  }

  @Get('multiplications')
  async getMultiplications(
    @Query() generateMultiplicationsDto: GenerateMultiplicationsDto,
  ) {
    const response = await this.basicMathsService.multiplications(
      generateMultiplicationsDto,
    );
    return response;
  }

  @Get('divisions')
  async getDivisions(@Query() generateDivitionsDto: GenerateDivisionsDto) {
    const response =
      await this.basicMathsService.divisions(generateDivitionsDto);
    return response;
  }
}
