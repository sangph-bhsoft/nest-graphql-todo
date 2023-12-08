import { UserVm } from '@modules/user/models/user-vm.model';
import { RegisterDto } from './dto/register.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@modules/user/user.entity';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { LoginDto } from './dto/login.dto';
import { LoginResponseVm } from './models/login-response-vm.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectMapper()
    private mapper: Mapper,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto): Promise<UserVm> {
    const { email, name, password } = payload;
    const salt = await genSalt(10);

    const hashPassword = await hash(password, salt);
    const userCreate = this.userRepository.create();
    userCreate.email = email;
    userCreate.name = name;
    userCreate.password = hashPassword;
    const user = await this.userRepository.save(userCreate);
    return this.mapper.map(user, UserEntity, UserVm);
  }

  async login(payload: LoginDto): Promise<LoginResponseVm> {
    const { email, password } = payload;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found');
    const checkPassword = compare(password, (await user).password);
    if (!checkPassword) throw new UnauthorizedException('Password invalid');
    return {
      token: this.jwtService.sign({ userId: user.id }),
    };
  }
}
