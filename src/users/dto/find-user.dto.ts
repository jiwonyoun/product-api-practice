import { InputType, ObjectType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/users.entity';

@InputType()
export class FindUserInput extends PickType(User, ['id']) {}

@ObjectType()
export class FindUserOutput extends CoreOutput {
  data?: User;
}
