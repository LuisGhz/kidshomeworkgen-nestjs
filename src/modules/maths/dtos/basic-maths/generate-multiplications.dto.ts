import { IsNotEmpty } from 'class-validator';

export class GenerateMultiplicationsDto {
  @IsNotEmpty()
  pages: number;
  @IsNotEmpty()
  multiplicandDitis: number;
  @IsNotEmpty()
  multiplierDigits: number;
}
