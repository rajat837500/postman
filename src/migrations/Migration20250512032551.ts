import { Migration } from '@mikro-orm/migrations';

export class Migration20250512032551 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "request_log" ("id" varchar(255) not null, "method" varchar(255) not null, "url" varchar(255) not null, "headers" jsonb null, "body" jsonb null, "response_status" int not null, "created_at" timestamptz not null, "duration_ms" int null, constraint "request_log_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "request_log" cascade;`);
  }

}
