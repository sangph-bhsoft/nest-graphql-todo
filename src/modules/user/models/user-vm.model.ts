import { AutoMap } from '@automapper/classes';
import { Role } from '@modules/auth/models/role.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseVm } from '@shared/models/base-vm.model';

@ObjectType({
  description: 'UserVm',
})
export class UserVm extends BaseVm {
  @Field()
  @AutoMap()
  email: string;

  @Field()
  @AutoMap()
  name: string;

  @Field(() => Role)
  @AutoMap()
  role: Role;
}
