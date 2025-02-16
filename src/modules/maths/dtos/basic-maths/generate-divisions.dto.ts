/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class GenerateDivisionsDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  dividendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  divisorDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  canHaveRemainder: boolean;
}
