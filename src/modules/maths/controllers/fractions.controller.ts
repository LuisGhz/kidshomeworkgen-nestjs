import { Controller, Get, Query, Res } from '@nestjs/common';
import { GenerateFrAdditionsDto } from '../dtos/fractions/generate-fr-additions.dto';
import { FractionsService } from '../services/fractions.service';
import { GenerateFrSubstractionsDto } from '../dtos/fractions/generate-fr-substractions.dto';
import { GenerateFrMultiplicationsDto } from '../dtos/fractions/generate-fr-multiplications.dto';
import { PdfService } from 'src/modules/shared/services/pdf.service';
import { Response } from 'express';
import { resPdf } from 'src/modules/shared/utils/resPdf.util';

@Controller('api/fractions')
export class FractionsController {
  constructor(
    private readonly fractionsService: FractionsService,
    private readonly pdfService: PdfService,
  ) {}

  @Get('additions')
  async getAdditions(
    @Query() generateFrAdditionsDto: GenerateFrAdditionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '/maths/hbs/fractions/fr-additions';
    const response = await this.fractionsService.additions(
      generateFrAdditionsDto,
    );
    const pdf = await this.pdfService.generatePdf(response, templatePath);
    resPdf({ res, pdf, fileName: 'Fr-additions' });
  }

  @Get('substractions')
  async getSubstractions(
    @Query() generateFrSubstractionsDto: GenerateFrSubstractionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '/maths/hbs/fractions/fr-substractions';
    const response = await this.fractionsService.substractions(
      generateFrSubstractionsDto,
    );
    const pdf = await this.pdfService.generatePdf(response, templatePath);
    resPdf({ res, pdf, fileName: 'Fr-substractions' });
  }

  @Get('multiplications')
  async getMultiplications(
    @Query() generateFrSubstractionsDto: GenerateFrMultiplicationsDto,
    @Res() res: Response,
  ) {
    const templatePath = '/maths/hbs/fractions/fr-multiplications';
    const response = await this.fractionsService.multiplications(
      generateFrSubstractionsDto,
    );
    const pdf = await this.pdfService.generatePdf(response, templatePath);
    resPdf({ res, pdf, fileName: 'Fr-multiplications' });
  }
}
