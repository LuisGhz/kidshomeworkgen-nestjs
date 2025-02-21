import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicMathsService } from '../services/basic-maths.service';
import { PdfService } from 'src/modules/shared/services/pdf.service';
import { GenerateAdditionsDto } from '../dtos/basic-maths/generate-additions.dto';
import { GenerateSubstractionsDto } from '../dtos/basic-maths/generate-substractions.dto';
import { GenerateMultiplicationsDto } from '../dtos/basic-maths/generate-multiplications.dto';
import { GenerateDivisionsDto } from '../dtos/basic-maths/generate-divisions.dto';
import { resPdf } from 'src/modules/shared/utils/resPdf.util';
import { PdfHttpService } from 'src/modules/shared/services/pdf-http.service';
import {
  createFormData,
  loadTemplate,
} from 'src/modules/shared/utils/pdf-request.util';

@Controller('api/basic-maths')
export class BasicMathsController {
  constructor(
    private readonly basicMathsService: BasicMathsService,
    private readonly pdfService: PdfService,
    private readonly pdfHttpService: PdfHttpService,
  ) {}

  @Get('additions-axios')
  async getAdditionsAxios(@Res() res: Response) {
    const template = loadTemplate(
      __dirname,
      '../hbs/basic-maths/additions.hbs',
    );
    const data = {
      additions: [
        {
          firstAddend: 1,
          secondAddend: 2,
        },
        {
          firstAddend: 1,
          secondAddend: 2,
        },
        {
          firstAddend: 1,
          secondAddend: 2,
        },
        {
          firstAddend: 1,
          secondAddend: 2,
        },
        {
          firstAddend: 1,
          secondAddend: 2,
        },
        {
          firstAddend: 1,
          secondAddend: 2,
        },
        {
          firstAddend: 1,
          secondAddend: 2,
        },
      ],
    };
    const { form, headers } = createFormData(template, data);
    const pdf = await this.pdfHttpService.post(form, headers);
    resPdf({ res, pdf, fileName: 'Additions' });
  }

  @Get('additions')
  async getAdditions(
    @Query() generateAdditionsDto: GenerateAdditionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '../hbs/basic-maths/additions.hbs';
    const response =
      await this.basicMathsService.additions(generateAdditionsDto);
    const pdf = await this.pdfService.generatePdf(
      response,
      __dirname,
      templatePath,
    );
    resPdf({ res, pdf, fileName: 'Additions' });
  }

  @Get('substractions')
  async getSubstractions(
    @Query() generateSubstractionsDto: GenerateSubstractionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '../hbs/basic-maths/substractions.hbs';
    const response = await this.basicMathsService.substractions(
      generateSubstractionsDto,
    );
    const pdf = await this.pdfService.generatePdf(
      response,
      __dirname,
      templatePath,
    );
    resPdf({ res, pdf, fileName: 'Substractions' });
  }

  @Get('multiplications')
  async getMultiplications(
    @Query() generateMultiplicationsDto: GenerateMultiplicationsDto,
    @Res() res: Response,
  ) {
    const templatePath = '../hbs/basic-maths/multiplications.hbs';
    const response = await this.basicMathsService.multiplications(
      generateMultiplicationsDto,
    );
    const pdf = await this.pdfService.generatePdf(
      response,
      __dirname,
      templatePath,
    );
    resPdf({ res, pdf, fileName: 'Multiplications' });
  }

  @Get('divisions')
  async getDivisions(
    @Query() generateDivitionsDto: GenerateDivisionsDto,
    @Res() res: Response,
  ) {
    const templatePath = '../hbs/basic-maths/divisions.hbs';
    const response =
      await this.basicMathsService.divisions(generateDivitionsDto);
    const pdf = await this.pdfService.generatePdf(
      response,
      __dirname,
      templatePath,
    );
    resPdf({ res, pdf, fileName: 'Divisions' });
  }
}
