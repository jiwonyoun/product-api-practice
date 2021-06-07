import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserInput, FindUserOutput } from './dto/find-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async findOne({ id }: FindUserInput): Promise<FindUserOutput> {
    try {
      const user = await this.user.findOne(id);
      if (!user) {
        return {
          ok: false,
          error: 'Could not found user',
        };
      }
      return {
        ok: true,
        data: user,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
