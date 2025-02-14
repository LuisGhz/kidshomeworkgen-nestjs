import { Response } from 'express';

export const resPdf = (
  res: Response,
  pdf: Buffer<Uint8Array<ArrayBufferLike>>,
) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', pdf.length);
  res.send(pdf);
};
