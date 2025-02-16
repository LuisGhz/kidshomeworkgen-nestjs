/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GenerateAdditionsDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  firstAddendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  secondAddendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  includeDecimals: boolean;
}
