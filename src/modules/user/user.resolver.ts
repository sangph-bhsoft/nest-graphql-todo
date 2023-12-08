import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UserVm } from './models/user-vm.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/auth.guard';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@modules/auth/models/role.enum';
import { RolesGuard } from '@modules/auth/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '@shared/decorators/user.decorator';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserVm])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllUser(): Promise<UserVm[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserVm)
  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Args('createUserDto') payload: CreateUserDto,
    @CurrentUser() user: UserVm,
  ): Promise<UserVm> {
    const userVm = await this.userService.create(payload, user);
    pubSub.publish('userAdded', { userAdded: userVm });

    return userVm;
  }

  @Subscription(() => UserVm, {
    name: 'userAdded',
  })
  subscribeToCommentAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
