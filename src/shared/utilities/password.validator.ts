/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from '@nestjs/class-validator';

@ValidatorConstraint({ name: 'containsSpecialCharacter', async: false })
export class ContainsSpecialCharacterConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string): boolean {
    // Ensure that the password contains at least one special character
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  defaultMessage(): string {
    return 'Password must contain at least one special character';
  }
}

export function ContainsSpecialCharacter(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ContainsSpecialCharacterConstraint,
    });
  };
}
