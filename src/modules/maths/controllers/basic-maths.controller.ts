import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicMathsService } from '../services/basic-maths.service';
import { PdfService } from 'src/modules/shared/services/pdf.service';
import { GenerateAdditionsDto } from '../dtos/generate-additions.dto';
import { GenerateSubstractionsDto } from '../dtos/generate-substractions.dto';
import { GenerateMultiplicationsDto } from '../dtos/generate-multiplications.dto';
import { GenerateDivisionsDto } from '../dtos/generate-divisions.dto';
import { compileTemplateToHtml } from 'src/shared/utils/compileTemplateToHtml';
import { generatePDFFromHTML } from 'src/shared/utils/generatePDFFromHTML';
import { resPdf } from 'src/modules/shared/utils/resPdf.util';

@Controller('api/basic-maths')
export class BasicMathsController {
  constructor(
    private readonly basicMathsService: BasicMathsService,
    private readonly pdfService: PdfService,
  ) {}

  @Get('additions')
  async getAdditions(
    @Query() generateAdditionsDto: GenerateAdditionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '/maths/hbs/basic-maths/additions';
    const response =
      await this.basicMathsService.additions(generateAdditionsDto);
    const pdf = await this.pdfService.generatePdf(response, templatePath);
    resPdf(res, pdf);
  }

  @Get('substractions')
  async getSubstractions(
    @Query() generateSubstractionsDto: GenerateSubstractionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '/maths/hbs/basic-maths/substractions';
    const response = await this.basicMathsService.substractions(
      generateSubstractionsDto,
    );
    const pdf = await this.pdfService.generatePdf(response, templatePath);
    resPdf(res, pdf);
  }

  @Get('multiplications')
  async getMultiplications(
    @Query() generateMultiplicationsDto: GenerateMultiplicationsDto,
    @Res() res: Response,
  ) {
    const templatePath = '/maths/hbs/basic-maths/multiplications';
    const response = await this.basicMathsService.multiplications(
      generateMultiplicationsDto,
    );
    const pdf = await this.pdfService.generatePdf(response, templatePath);
    resPdf(res, pdf);
  }

  @Get('divisions')
  async getDivisions(
    @Query() generateDivitionsDto: GenerateDivisionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '/maths/hbs/basic-maths/divisions';
    const response =
      await this.basicMathsService.divisions(generateDivitionsDto);
    const pdf = await this.pdfService.generatePdf(response, templatePath);
    resPdf(res, pdf);
  }

  @Get('test-template')
  async getTemp(@Res() res: Response) {
    const html = compileTemplateToHtml('/maths/hbs/basic-maths/temp');
    const pdf = await generatePDFFromHTML(html);
    res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=maths.pdf');
    res.setHeader('Content-Length', pdf.length);
    res.send(Buffer.from(pdf));
  }
}
