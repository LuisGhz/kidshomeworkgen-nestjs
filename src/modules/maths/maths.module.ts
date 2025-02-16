import { Module } from '@nestjs/common';
import { BasicMathsController } from './controllers/basic-maths.controller';
import { FractionsController } from './controllers/fractions.controller';
import { BasicMathsService } from './services/basic-maths.service';
import { FractionsService } from './services/fractions.service';
import { ArithmeticController } from './controllers/arithmetic.controller';

@Module({
  imports: [],
  controllers: [
    BasicMathsController,
    FractionsController,
    ArithmeticController,
  ],
  providers: [BasicMathsService, FractionsService],
  exports: [],
})
export class MathsModule {}
