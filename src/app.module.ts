import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MathsModule } from './modules/maths/maths.module';
import { OpenaiModule } from './modules/openai/openai.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [ConfigModule.forRoot(), SharedModule, OpenaiModule, MathsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
