import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PdfHttpService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY)
    private readonly appConfigService: ConfigType<typeof appConfig>,
  ) {}

  async post(data: FormData, headers: FormData.Headers) {
    const url = this.appConfigService.pdfApiUri;
    const res = await firstValueFrom(
      this.httpService.post(url, data, {
        headers,
        responseType: 'arraybuffer',
      }),
    );

    const pdf = res.data as unknown as Buffer<Uint8Array<ArrayBufferLike>>;
    return pdf;
  }
}
