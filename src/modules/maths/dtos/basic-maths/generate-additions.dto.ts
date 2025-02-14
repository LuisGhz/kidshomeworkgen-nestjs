import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GenerateAdditionsDto {
  @IsNotEmpty()
  pages: number;
  @IsNotEmpty()
  firstAddendDigits: number;
  @IsNotEmpty()
  secondAddendDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  includeDecimals: boolean;
}
