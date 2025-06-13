/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min, Max } from 'class-validator';

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
  dividendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(3)
  divisorDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  canHaveRemainder: boolean;
}
