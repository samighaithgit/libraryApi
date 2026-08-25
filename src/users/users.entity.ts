import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column(
        {nullable:true,}
    )
    name?:string;

    @Column({
        unique:true,
    })
    email!:string;
    
    @Column()
    hashedpassword!:string;


}