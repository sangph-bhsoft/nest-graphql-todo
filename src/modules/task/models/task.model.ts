import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'task ' })
export class Task {
  @Field(() => ID)
  id: string;

  @Directive('@upper')
  @Field()
  title: string;
}
