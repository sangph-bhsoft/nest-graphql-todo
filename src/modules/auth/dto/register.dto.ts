import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ContainsSpecialCharacter } from '@shared/utilities/password.validator';

@InputType()
export class RegisterDto {
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
}
