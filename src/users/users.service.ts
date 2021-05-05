import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    try {
      return await this.user.findOne(id);
    } catch (e) {
      console.log(e);
    }
  }
}
