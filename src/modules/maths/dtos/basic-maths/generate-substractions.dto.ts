/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class GenerateSubstractionsDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  minuendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  subtrahendDigits: number;
}
