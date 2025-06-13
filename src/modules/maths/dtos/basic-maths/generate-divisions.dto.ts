/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min, Max } from 'class-validator';
import { IsGreaterThanOrEqualTo } from '../../decorators/is-greater-than-or-equal-to.decorator';

export class GenerateDivisionsDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(4)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(5)
  @IsGreaterThanOrEqualTo('divisorDigits', {
      message:
        'first addend digits must be greater than or equal to second addend digits.',
    })
  dividendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(3)
  divisorDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  canHaveRemainder: boolean;
}
