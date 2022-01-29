import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

export enum Roles {
    CLIENT = "client",
    ADMIN = "admin",
}

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        name: "password_hash",
    })
    passwordHash: string;

    @Column({
        type: "enum",
        enum: Roles,
        default: Roles.CLIENT,
    })
    role: string;

    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart;
}
