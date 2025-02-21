import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data';

export const loadTemplate = (dirname: string, hbsRelativePath: string) => {
  const template = fs.readFileSync(path.join(dirname, hbsRelativePath));
  return template;
};

export const createFormData = (
  template: Buffer<ArrayBufferLike>,
  data: any,
) => {
  const form = new FormData();
  form.append('template', template, { filename: 'template.hbs' });
  form.append('data', JSON.stringify(data));
  const headers: FormData.Headers = {
    ...form.getHeaders(),
    'Content-Length': form.getLengthSync(),
  };
  return { form, headers };
};
