import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { UserEntity } from '../auth/entities/user.entity';

export enum RequestType {
  BORROW = 'borrow',
  BUY = 'buy',
}

export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('request')
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RequestType })
  type: RequestType;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => BookEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @Column({ nullable: true })
  bookId: number;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: true })
  userId: number;
}