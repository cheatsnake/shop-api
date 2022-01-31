import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("param")
export class Param extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    body: string;
}
