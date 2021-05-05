import { Role } from '../role/role.enum';

export class User {
  id: string;
  pw: string;
  roles: Role[];
}

export const users = [];

const data: User = {
  id: '123123',
  pw: '123123',
  roles: [Role.Admin],
};
users.push(data);
