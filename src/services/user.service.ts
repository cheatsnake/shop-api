import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDto } from "../dto/user.dto";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";

export class UserService {
    async register(dto: UserDto) {
        const user = await User.findOne({ where: { email: dto.email } });
        if (user) {
            throw new Error();
        }
        const passwordHash = await bcrypt.hash(dto.password, 7);
        const newUser = User.create({ email: dto.email, passwordHash });
        const cart = Cart.create({ userId: newUser.id });
        await cart.save();
        newUser.cart = cart;
        console.log(newUser);

        const jwtToken = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
            String(process.env.JWT_SECRET),
            { expiresIn: "1h" }
        );

        await newUser.save();

        return jwtToken;
    }
    async login(dto: UserDto) {}
}
