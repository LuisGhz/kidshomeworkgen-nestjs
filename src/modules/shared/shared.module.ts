import { Global, Module } from '@nestjs/common';
import { PdfService } from './services/pdf.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PdfService],
  exports: [PdfService],
})
export class SharedModule {}
