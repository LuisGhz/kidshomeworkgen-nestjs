import { Module } from '@nestjs/common';
import { BasicMathsService } from './services/basic-maths.service';
import { BasicMathsController } from './controllers/basic-maths.controller';

@Module({
  imports: [],
  controllers: [BasicMathsController],
  providers: [BasicMathsService],
  exports: [],
})
export class MathsModule {}
