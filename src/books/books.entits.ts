import {Column,Entity,PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'varchar',length:100})
    name!:string;
    

    @Column({type:'varchar',length:100})
    type!:string;

    @Column({type:'int'})
    price!:number;



}