import { Injectable } from '@nestjs/common';
import { compileTemplateToHtml } from 'src/modules/shared/utils/compileTemplateToHtml';
import { generatePDFFromHTML } from 'src/modules/shared/utils/generatePDFFromHTML';

@Injectable()
export class PdfService {
  /**
   * @param {T} data Generated data from AI
   * @param {string} templatepath starting from modules, for instance: /maths/hbs/basic-maths/temp
   * @return {*} Pdf Buffer
   */
  async generatePdf<T>(data: T, templatepath: string) {
    const html = compileTemplateToHtml(templatepath, data);
    const pdf = await generatePDFFromHTML(html);
    return Buffer.from(pdf);
  }
}
