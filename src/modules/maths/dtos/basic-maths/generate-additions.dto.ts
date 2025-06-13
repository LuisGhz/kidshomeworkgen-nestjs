/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { IsGreaterThanOrEqualTo } from '../../decorators/is-greater-than-or-equal-to.decorator';

export class GenerateAdditionsDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(4)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(5)
  @IsGreaterThanOrEqualTo('secondAddendDigits', {
    message:
      'first addend digits must be greater than or equal to second addend digits.',
  })
  firstAddendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(5)
  secondAddendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  includeDecimals: boolean;
}
