import { AutoMap } from '@automapper/classes';
import { Role } from '@modules/auth/models/role.enum';
import { BaseEntity } from '@shared/models/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  @AutoMap()
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @Column()
  @AutoMap()
  name: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
