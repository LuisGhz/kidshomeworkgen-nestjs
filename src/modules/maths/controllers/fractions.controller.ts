import { Controller, Get, Query } from '@nestjs/common';
import { GenerateFrAdditionsDto } from '../dtos/fractions/generate-fr-additions.dto';
import { FractionsService } from '../services/fractions.service';

@Controller('api/fractions')
export class FractionsController {
  constructor(private readonly fractionsService: FractionsService) {}

  @Get('additions')
  getAdditions(@Query() generateFrAdditionsDto: GenerateFrAdditionsDto) {
    return this.fractionsService.additions(generateFrAdditionsDto);
  }
}
