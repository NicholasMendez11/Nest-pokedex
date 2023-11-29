/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class QueriespaginationDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  offset?: number;
}
