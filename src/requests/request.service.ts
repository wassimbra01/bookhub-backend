import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity, RequestStatus } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepo: Repository<RequestEntity>,
  ) {}

  async createRequest(body: any) {
    const request = this.requestRepo.create({
      type: body.type,
      message: body.message || '',
      bookId: body.bookId,
      userId: body.userId,
      status: RequestStatus.PENDING,
    });
    return await this.requestRepo.save(request);
  }

  async getAllRequests() {
    return await this.requestRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: number, status: RequestStatus) {
    const request = await this.requestRepo.findOne({ where: { id } });
    if (!request) throw new NotFoundException('Request not found');
    request.status = status;
    return await this.requestRepo.save(request);
  }

  async deleteRequest(id: number) {
    await this.requestRepo.delete(id);
    return { message: 'Deleted successfully' };
  }

  async getUserRequests(userId: number) {
    return await this.requestRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}