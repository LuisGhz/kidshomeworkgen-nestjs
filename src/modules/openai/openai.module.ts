import { Global, Module } from '@nestjs/common';
import { OpenAIService } from './services/openai.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenaiModule {}
