import { Injectable } from '@nestjs/common';
import { PdfHttpService } from './pdf-http.service';
import { createFormData, loadTemplate } from '../utils/pdf-request.util';

@Injectable()
export class PdfService {
  constructor(private readonly pdfHttpService: PdfHttpService) {}

  /**
   * @param {T} data Generated data from AI
   * @param {string} templatepath using relative paths, for instance: ../hbs/basic-maths/additions.hbs
   * @return {*} Pdf Buffer
   */
  async generatePdf<T>(data: T, dirname: string, templatepath: string) {
    const template = loadTemplate(dirname, templatepath);
    const { form, headers } = createFormData(template, data);
    const pdf = await this.pdfHttpService.post(form, headers);
    return Buffer.from(pdf);
  }
}
