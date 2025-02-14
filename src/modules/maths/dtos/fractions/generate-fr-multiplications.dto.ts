import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class GenerateFrMultiplicationsDto {
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  canHaveWholes: boolean;
  @IsNotEmpty()
  @IsIn(['same', 'different', 'mixed'])
  denominatorsType: 'same' | 'different' | 'mixed';
}
