import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LogsService } from './logs.service';
import { RequestLog } from '../entities/request-log.entity';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  // @Post()
  // async create(@Body() body: Partial<RequestLog>): Promise<RequestLog> {
  //   return this.logsService.create(body);
  // }

  @Post()
  async createLog(@Body() logData: Partial<RequestLog>) {
    return this.logsService.create(logData);
  }

  @Get()
  async findAll(): Promise<RequestLog[]> {
    return this.logsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<RequestLog | null> {
    return this.logsService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.logsService.delete(id);
    return { success };
  }
}
