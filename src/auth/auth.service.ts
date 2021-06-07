import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

// Service with Jwt
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user && user.pw === pass) {
      const { pw, ...reuslt } = user;
      return reuslt;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, pw: user.pw };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
