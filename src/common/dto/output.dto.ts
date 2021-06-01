import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
export class CoreOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}
