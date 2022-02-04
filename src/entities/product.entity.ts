import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";

export interface Param {
    name: string;
    body: string;
}

@Entity("product")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    price: number;

    @ManyToOne(() => Category, (category) => category.name)
    @JoinColumn()
    category: Category;

    @Column({ nullable: false })
    description: string;

    @Column({
        nullable: false,
        type: "simple-array",
        default: [],
    })
    images: string[];

    @Column("jsonb", {
        nullable: false,
        default: [],
    })
    params: Param[];

    @Column({
        default: true,
    })
    available: boolean;

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: Date;
}
