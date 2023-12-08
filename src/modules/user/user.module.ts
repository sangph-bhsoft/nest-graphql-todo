import { Module } from '@nestjs/common';
import { UserProfile } from './profiles/user.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  exports: [UserService],
  providers: [UserProfile, UserService, UserResolver],
})
export class UserModule {}
