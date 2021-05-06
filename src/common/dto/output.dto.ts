import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class CoreOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String)
  error?: string;
}
