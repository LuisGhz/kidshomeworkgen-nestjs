import { Module } from '@nestjs/common';
import { BasicMathsController } from './controllers/basic-maths.controller';
import { FractionsController } from './controllers/fractions.controller';
import { BasicMathsService } from './services/basic-maths.service';
import { FractionsService } from './services/fractions.service';

@Module({
  imports: [],
  controllers: [BasicMathsController, FractionsController],
  providers: [BasicMathsService, FractionsService],
  exports: [],
})
export class MathsModule {}
