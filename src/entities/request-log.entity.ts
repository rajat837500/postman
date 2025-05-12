import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class RequestLog {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  method!: string;

  @Property()
  url!: string;

  @Property({ type: 'json', nullable: true })
  headers?: Record<string, any>;

  @Property({ type: 'json', nullable: true })
  body?: any;

  @Property()
  responseStatus!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true })
  durationMs?: number;
}
