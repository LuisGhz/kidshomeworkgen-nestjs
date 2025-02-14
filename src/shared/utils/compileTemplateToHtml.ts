import Handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';

export const compileTemplateToHtml = <T>(templatePath: string, data?: T) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const templateFilePath = path.join(
      process.cwd(),
      'src/modules',
      `${templatePath}.hbs`,
    );
    const fileData = fs.readFileSync(templateFilePath, 'utf8');
    const template = Handlebars.compile(fileData)(data);
    return template;
  } catch (error) {
    throw error;
  }
};
