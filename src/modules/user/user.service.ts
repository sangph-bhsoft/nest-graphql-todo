import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserVm } from './models/user-vm.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  async findAll(): Promise<UserVm[]> {
    const users = await this.userRepository.find();
    return this.mapper.mapArray(users, UserEntity, UserVm);
  }

  async findOne(id: number): Promise<UserVm> {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.mapper.map(user, UserEntity, UserVm);
  }

  async create(payload: CreateUserDto, user: UserVm): Promise<UserVm> {
    console.log({ user });

    const userCreate = this.userRepository.create(payload);
    const userE = await this.userRepository.save(userCreate);

    return this.mapper.map(userE, UserEntity, UserVm);
  }
}
