import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

class Name {
  @Column({
    default: 'Mr.',
  })
  first: string;

  @Column({
    default: 'John',
  })
  last: string;
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'title',
    select: true,
  })
  title: string;

  @Column(() => Name)
  name: Name;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
