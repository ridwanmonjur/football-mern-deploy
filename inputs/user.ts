import { IsCreditCard, IsEmail, IsOptional, IsString, Length } from "class-validator";

export class CreateUserInput {
    @IsEmail()
    email: string;
    
    @Length(7,12)
    phone: string;
    
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
 
