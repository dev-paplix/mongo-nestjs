import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSalesDataDto {
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsString()
  customerId: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  salesRep?: string;
}