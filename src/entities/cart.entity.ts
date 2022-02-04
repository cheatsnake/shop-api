import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface Products {
    productId: number;
    amount: number;
}

@Entity("cart")
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    userId: number;

    @Column({
        type: "simple-json",
        default: [],
    })
    products: Products[];
}
