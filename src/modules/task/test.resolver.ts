import { Mutation, Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';

@Resolver()
export class TestResolver {
  @Mutation(() => Task)
  async updateTask() {
    return 'test';
  }

  @Mutation(() => Task)
  async updateTask1() {
    return 'test';
  }
}
