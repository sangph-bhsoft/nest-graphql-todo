import { AutoMap } from '@automapper/classes';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'BaseVm',
})
export class BaseVm {
  @Field(() => ID)
  @AutoMap()
  id: number;
}
