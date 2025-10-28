import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

export class CreateUserActivityDto {
  @IsString()
  userId: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}