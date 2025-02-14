import { Controller, Get, Query } from '@nestjs/common';
import { GenerateFrAdditionsDto } from '../dtos/fractions/generate-fr-additions.dto';
import { FractionsService } from '../services/fractions.service';
import { GenerateFrSubstractionsDto } from '../dtos/fractions/generate-fr-substractions.dto';
import { GenerateFrMultiplicationsDto } from '../dtos/fractions/generate-fr-multiplications.dto';

@Controller('api/fractions')
export class FractionsController {
  constructor(private readonly fractionsService: FractionsService) {}

  @Get('additions')
  getAdditions(@Query() generateFrAdditionsDto: GenerateFrAdditionsDto) {
    return this.fractionsService.additions(generateFrAdditionsDto);
  }

  @Get('substractions')
  getSubstractions(
    @Query() generateFrSubstractionsDto: GenerateFrSubstractionsDto,
  ) {
    return this.fractionsService.substractions(generateFrSubstractionsDto);
  }

  @Get('multiplications')
  getMultiplications(
    @Query() generateFrSubstractionsDto: GenerateFrMultiplicationsDto,
  ) {
    return this.fractionsService.multiplications(generateFrSubstractionsDto);
  }
}
