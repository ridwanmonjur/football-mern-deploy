import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { validationOptions } from './validatorOptions';
import { HTTP422UnproccessableEntity } from '../exceptions/AppError';

export async function validationHelper(dto: any, body: any) {
    const toBeValidated = plainToClass(dto, body) as typeof dto;
    console.log({ toBeValidated })
    const validationError = await validate(toBeValidated, validationOptions)
    const validationLength = validationError?.length || 0;
    let allValidations = "";
    let firstValidationConstraint = "";
    if (validationLength > 0) {
        Object.keys(validationError[0].constraints).forEach(
            (currentValue: any) => {
                firstValidationConstraint += `${validationError[0].constraints[currentValue]}. `
            }
        )
        validationError.forEach(
            (currentValue: any, currentIndex: number): void => {
                if (validationLength === 1) { allValidations += `'${currentValue.property}' `; return; }
                if (currentIndex === validationLength - 1) { allValidations += `'${currentValue.property}'`; }
                else if (currentIndex === validationLength - 2) { allValidations += `'${currentValue.property}' and `; }
                else { allValidations += `'${currentValue.property}', `; }
            }
        ) as any as string;
        throw new HTTP422UnproccessableEntity(
            `${firstValidationConstraint}`
            + "\n\n"
            + `${validationLength} property(s): ${allValidations} failed validation.`
        );
    }
    return toBeValidated;
}
