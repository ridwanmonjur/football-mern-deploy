import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { HTPP422UnproccessableEntity } from '../exceptions/AppError';

export function validateAndThrowError(validationError: ValidationError[]) {
    const validationLength = validationError.length;
    let allValidations = "";
    validationError.forEach(
        (currentValue: ValidationError, currentIndex: number): void => {
            if (validationLength === 1) { allValidations += `${currentValue.property} `; }
            if (currentIndex === validationLength - 1) { allValidations += `${currentValue.property}.`; }
            else if (currentIndex === validationLength - 2) { allValidations += `${currentValue.property} and `; }
            else { allValidations += `${currentValue.property}, `; }
        }
    ) as any as string;
    if (validationLength > 0) {
        throw new HTPP422UnproccessableEntity(
            `${allValidations} properties failed validation.`
        );
    }
    return allValidations;
}