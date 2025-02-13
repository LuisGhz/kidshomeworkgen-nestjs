import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GenerateDivisionsDto {
  @IsNotEmpty()
  pages: number;
  @IsNotEmpty()
  dividendDigits: number;
  @IsNotEmpty()
  divisorDigits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  canHaveRemainder: boolean;
}
