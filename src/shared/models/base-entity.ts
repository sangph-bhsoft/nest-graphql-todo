import { AutoMap } from '@automapper/classes';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @CreateDateColumn()
  @AutoMap()
  create_at: Date;

  @CreateDateColumn()
  @AutoMap()
  update_date: Date;
}
