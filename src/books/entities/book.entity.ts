import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimeStampISIDS } from "../shared/timestamp";
import { AuthorEntity } from "./author.entity";
import { UserEntity } from "../../auth/entities/user.entity";


@Entity('livre')
export class BookEntity extends TimeStampISIDS {
   
    @PrimaryGeneratedColumn()
    id;
    
    @Column(
        {
            //name : 'titre'
            //type : "varchar"
            length : 50,
            //unique : true
            //update : false
        }
    )
    title : string;
    
    @Column()
    year : number;
    
    @Column(
        {
            type: "varchar"
        }
    )
    editor;// : string;
    
    @Column()
    image : string;
    
    @ManyToOne(() => AuthorEntity, author => author.listeLivres, {
  eager: true
})
@JoinColumn({ name: "authorId" })
author: AuthorEntity;

@Column({ nullable: true })
authorId: number;

@ManyToOne(() => UserEntity, user => user.books)
@JoinColumn({ name: 'userId' })
user: UserEntity;
}