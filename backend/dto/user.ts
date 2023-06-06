import { plainToClass, plainToInstance, Transform, Type } from 'class-transformer'
import { IsArray, IsBoolean, IsCreditCard, IsEmail, IsEnum, IsMongoId, IsOptional, IsString, Length, MinLength, ValidateNested, isString } from "class-validator";
import "reflect-metadata";

enum Roles{
    admin, customer, seller
}

class Address {
    @Length(20,100)
    @IsString()
    first: string;

    @IsString()
    @Length(20,100)
    second: string;
}

class CreditCard {
    @IsCreditCard()
    number: string;
    @Length(3, 4)
    CVV: string;
}
export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsOptional()
    @Length(6,12)
    confirmPassword: string;

    @IsOptional()
    isVerified: boolean;
    
    @IsString()
    @Length(3,32)
    name: string;

    @IsOptional()
    @IsString()
    image: string;
    
    @Length(6,12)
    password: string;

    @IsOptional()
    creditCard: CreditCard;

    @IsOptional()
    address: Address;

    @IsEnum(Roles)
    role: string

    @IsOptional()
    token: Token;
}

export class UserLoginDto {
    @IsEmail()
    email: string;
    
    @Length(6,12)
    password: string;
}

export class UserTokenDto {
    @IsEmail()
    email: string;
    
    @Length(6,12)
    password: string;
}

export class Token {
    @IsOptional()
    @IsString()
    resetPassword: string;

    @IsOptional()
    @IsString()
    verifyEmail: string;

    @IsBoolean()
    isVerified: boolean;
}

export class EditUserProfileDto {
    @IsOptional()
    token: Token;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    creditCard: CreditCard;

    @IsOptional()
    address: Address;

    @IsEmail()
    email: string;

    @IsString()
    @Length(3,32)
    name: string;
    
    @IsEnum(Roles)
    role: string
}

export class DeleteUserDtos {
    @IsArray()
    @MinLength(1, {
      each: true,
    })
    @IsMongoId({ each: true })
    ids: string[];
  }