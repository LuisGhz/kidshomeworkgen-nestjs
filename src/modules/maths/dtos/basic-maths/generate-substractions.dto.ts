/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min, Max } from 'class-validator';
import { IsGreaterThanOrEqualTo } from '../../decorators/is-greater-than-or-equal-to.decorator';

export class GenerateSubstractionsDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(2)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(5)
  @IsGreaterThanOrEqualTo('subtrahendDigits', {
    message:
      'first addend digits must be greater than or equal to second addend digits.',
  })
  minuendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(5)
  subtrahendDigits: number;
}
