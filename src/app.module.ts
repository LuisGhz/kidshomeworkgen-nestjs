import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { MathsModule } from './modules/maths/maths.module';
import { OpenaiModule } from './modules/openai/openai.module';
import { SharedModule } from './modules/shared/shared.module';
import appJoi from './config/app.joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appJoi,
    }),
    SharedModule,
    OpenaiModule,
    MathsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
