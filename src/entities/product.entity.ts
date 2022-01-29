import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Param } from "./param.entity";

@Entity("product")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Category, (category) => category.name)
    @JoinColumn()
    category: Category;

    @Column()
    description: string;

    @Column({
        type: "simple-array",
        default: [],
    })
    images: string[];

    @ManyToMany(() => Param)
    @JoinTable()
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
