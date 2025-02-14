import { IsNotEmpty } from 'class-validator';

export class GenerateSubstractionsDto {
  @IsNotEmpty()
  pages: number;
  @IsNotEmpty()
  minuendDigits: number;
  @IsNotEmpty()
  subtrahendDigits: number;
}
