import { IsCreditCard, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';


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
    // @ValidateNested()
    // @Type(() => CreditCard)
    creditCard: CreditCard;

    @IsOptional()
    // @ValidateNested()
    // @Type(() => Address)
    address: Address;
}
 
