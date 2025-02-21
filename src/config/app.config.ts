import { registerAs } from '@nestjs/config';

interface ConfigProps {
  port: number;
  nodeEnv: string;
  openaiApiKey: string;
  openaiApiUrl: string;
  pdfApiUri: string;
}

export default registerAs(
  'env',
  (): ConfigProps => ({
    port: parseInt(process.env.PORT!) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    openaiApiKey: process.env.OPENAI_API_KEY!,
    openaiApiUrl: process.env.OPENAI_API_URL!,
    pdfApiUri: process.env.PDF_API_URI!,
  }),
);
