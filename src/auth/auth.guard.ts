import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { users } from 'src/users/users';

@Injectable()
export class AuthGuard implements CanActivate {
  users = users;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest().headers.authorization;
    const arr = JSON.stringify(request).split(' ');
    const decoded = Buffer.from(arr[1], 'base64').toString('ascii');
    console.log(decoded);

    const loginArr = decoded.split(':');
    const authId = loginArr[0];
    const authPw = loginArr[1];

    if (users.find((data) => data.id == authId)) {
      return true;
    }
    return false;
  }
}
