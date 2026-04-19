import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../generics/role.enum';
import { BookEntity } from '../../books/entities/book.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;
  
  @Column({
    type : "enum",
    enum : Roles,
    default : Roles.ROLE_USER
  })
  role ;
  
  @OneToMany(() => BookEntity, book => book.user)
books: BookEntity[];
  
}
