import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "simple-json",
        nullable: true,
    })
    products: {
        productId: number;
        amount: number;
    };
}
