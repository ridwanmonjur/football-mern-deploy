import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { validationOptions } from './validatorOptions';
import { validateAndThrowError } from './validateAndThrowError';

export async function validationHelper(dto:any, body: any) {
    const toBeValidated = plainToClass(dto, body) as typeof dto;
    const validationError = await validate(toBeValidated, validationOptions)
    validateAndThrowError(validationError);

    return toBeValidated;
}