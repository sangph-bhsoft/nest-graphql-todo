import { Role } from '@modules/auth/models/role.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from '@nestjs/class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ContainsSpecialCharacter } from '@shared/utilities/password.validator';

@InputType()
export class CreateUserDto {
  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail()
  @Field()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @ContainsSpecialCharacter()
  @Field()
  password: string;

  @Field()
  name: string;

  @Field(() => Role)
  @IsEnum(Role, {
    message: 'Invalid user role',
  })
  @IsOptional()
  role: Role;
}
