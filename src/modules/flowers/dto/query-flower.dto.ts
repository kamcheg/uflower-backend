import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FlowersFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @Type(() => Number)
  priceMin: number | null;

  @IsOptional()
  @Type(() => Number)
  priceMax: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  composition: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  reasons: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  recipients: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  sizes: number[];
}
