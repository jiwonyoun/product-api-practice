import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import moment from 'moment';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../../role/role.enum';

@Entity()
export class User {
  @IsString()
  @PrimaryColumn()
  id: string;

  @IsString()
  @Column()
  pw: string;

  @IsEnum(Role)
  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role;
}

export const users = [];

const data: User = {
  id: '123123',
  pw: '123123',
  roles: Role.Admin,
};
users.push(data);
