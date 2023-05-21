import { ValidatorOptions } from "class-validator";

export const validationOptions: ValidatorOptions =
{
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    stopAtFirstError: true,
    validationError: {
        target: true,
        value: true
    }
}