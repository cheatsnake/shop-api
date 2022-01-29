import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("param")
export class Param extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    body: string;
}
