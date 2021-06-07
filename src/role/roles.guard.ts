import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { users } from 'src/users/entities/users.entity';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  users = users;

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log(requiredRoles);
    const user = context.switchToHttp().getRequest().headers.authorization;
    const arr = user.split(' ');
    const decoded = Buffer.from(arr[1], 'base64')
      .toString('ascii')
      .replace('=', '');

    const loginArr = decoded.split(':');
    const authId = loginArr[0];
    const authPw = loginArr[1];

    console.log(authId, authPw);

    console.log(typeof users);
    console.log(users.find((data) => data.id == authId));
    console.log(users);
    if (users.find((data) => data.id == authId)) {
      return true;
    }
    // return requiredRoles.some((role) => user.roles?.include(role));
    return false;
  }
}
