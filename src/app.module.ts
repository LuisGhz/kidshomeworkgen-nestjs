import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MathsModule } from './modules/maths/maths.module';
import { OpenaiModule } from './modules/openai/openai.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenaiModule, MathsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
