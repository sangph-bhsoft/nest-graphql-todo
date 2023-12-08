import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'UserVm',
})
export class LoginResponseVm {
  @Field()
  token: string;
}
