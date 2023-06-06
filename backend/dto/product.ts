// import { Transform, Type } from "class-transformer";
import { Type } from 'class-transformer'
import { IsArray, IsMongoId, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class DeleteProductDtos {
  @IsArray()
  @MinLength(1, {
    each: true,
  })
  @IsMongoId({ each: true })
  ids: string[];
}

export class ProductFilter {
  @IsOptional()
  @IsMongoId()
  seller: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  type: string;

  @IsString()
  image: string;

  @IsMongoId()
  seller: string;

  @Type(() => Number) 
  @IsNumber()
  @IsPositive()
  stock: number;

  @Type(() => Number) 
  @IsNumber()
  @IsPositive()
  price: number;
}

export class EditProductDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  type: string;

  @IsMongoId()
  seller: string;

  @IsString()
  image: string;

  @Type(() => Number) 
  @IsNumber()
  @IsPositive()
  stock: number;

  @Type(() => Number) 
  @IsNumber()
  @IsPositive()
  price: number;
}

