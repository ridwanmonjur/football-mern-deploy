import { IsCreditCard, IsEmail, IsOptional, IsString, Length } from "class-validator";

export class CreateUserInput {
    @IsEmail()
    email: string;
    
    @IsString()
    @Length(3,32)
    name: string;
    
    @Length(6,12)
    password: string;
}

export class UserLoginInput {
    @IsEmail()
    email: string;
    
    @Length(6,12)
    password: string;
}


export class EditUserProfileInput {

    @IsOptional()
    @IsCreditCard()
    creditCardNumber: string;

    @IsOptional()
    @Length(3, 4)
    creditCardCVV: string;

    @IsOptional()
    @IsString()
    addressFirst: string;

    @IsOptional()
    @IsString()
    addressSecond: string;

    @IsOptional()
    @IsString()
    totalPurchase: number;
}
 
