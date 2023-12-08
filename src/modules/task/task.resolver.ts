import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';

@Resolver()
export class TaskResolver {
  @Query(() => String)
  async test() {
    return 'test';
  }

  @Mutation(() => Task)
  async updateTask() {
    return 'test';
  }
}
