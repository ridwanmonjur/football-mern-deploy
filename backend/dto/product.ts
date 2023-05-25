// import { Transform, Type } from "class-transformer";
import { IsArray, IsBase64, IsMongoId, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

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

  @IsOptional()
  @IsBase64()
  image: string;

  @IsNumber()
  @IsPositive()
  stock: number;

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

  @IsOptional()
  @IsBase64()
  image: string;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsNumber()
  @IsPositive()
  price: number;
}