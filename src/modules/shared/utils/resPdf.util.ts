import { Response } from 'express';

interface ResPdfProps {
  res: Response;
  pdf: Buffer<Uint8Array<ArrayBufferLike>>;
  fileName: string;
}

export const resPdf = ({ res, pdf, fileName }: ResPdfProps) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', pdf.length);
  res.setHeader('Content-Disposition', `inline; filename=${fileName}.pdf`);
  res.send(pdf);
};
