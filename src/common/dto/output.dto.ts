import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class CoreOutput {
  @Field()
  ok: boolean;
  @Field()
  error?: string;
}
