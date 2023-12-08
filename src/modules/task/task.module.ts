import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TestResolver } from './test.resolver';

@Module({
  providers: [TaskResolver, TestResolver],
})
export class TaskModule {}
