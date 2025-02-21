import { Global, Module } from '@nestjs/common';
import { PdfService } from './services/pdf.service';
import { HttpModule } from '@nestjs/axios';
import { PdfHttpService } from './services/pdf-http.service';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PdfService, PdfHttpService],
  exports: [PdfService, PdfHttpService],
})
export class SharedModule {}
