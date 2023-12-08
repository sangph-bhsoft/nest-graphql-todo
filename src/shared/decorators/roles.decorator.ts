import { SetMetadata } from '@nestjs/common';
import { Role } from '../../modules/auth/models/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
