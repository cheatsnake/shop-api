import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;
}
