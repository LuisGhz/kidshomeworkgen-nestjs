import Handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';

export const compileTemplateToHtml = <T>(templatePath: string, data?: T) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const basePath = isProduction ? 'dist' : 'src';

    const templateFilePath = path.join(
      process.cwd(),
      basePath,
      'modules',
      `${templatePath}.hbs`,
    );
    const fileData = fs.readFileSync(templateFilePath, 'utf8');
    const template = Handlebars.compile(fileData)(data);
    return template;
  } catch (error) {
    throw error;
  }
};
