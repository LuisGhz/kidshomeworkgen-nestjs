/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class GenerateMultiplicationsDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  multiplicandDitis: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  multiplierDigits: number;
}
