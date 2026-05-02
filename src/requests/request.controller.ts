import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestStatus } from './request.entity';

@Controller('requests')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post()
  create(@Body() body) {
    return this.requestService.createRequest(body);
  }

  @Get()
  findAll() {
    return this.requestService.getAllRequests();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.requestService.getUserRequests(userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() body: { status: RequestStatus }) {
    return this.requestService.updateStatus(id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.requestService.deleteRequest(id);
  }
}