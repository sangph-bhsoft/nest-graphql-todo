import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterDto } from './dto/register.dto';
import { UserVm } from '@modules/user/models/user-vm.model';
import { AuthService } from './auth.service';
import { LoginResponseVm } from './models/login-response-vm.model';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => UserVm)
  async register(@Args('registerDto') payload: RegisterDto): Promise<UserVm> {
    return this.authService.register(payload);
  }

  @Mutation(() => LoginResponseVm)
  async login(@Args('loginDto') payload: LoginDto): Promise<LoginResponseVm> {
    return this.authService.login(payload);
  }
}
