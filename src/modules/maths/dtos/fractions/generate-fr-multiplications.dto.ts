import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsNotEmpty, Min } from 'class-validator';

export class GenerateFrMultiplicationsDto {
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  pages: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  canHaveWholes: boolean;
  @IsNotEmpty()
  @IsIn(['same', 'different', 'mixed'])
  denominatorsType: 'same' | 'different' | 'mixed';
}
