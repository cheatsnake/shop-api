import bcrypt from "bcrypt";
import { generateJwt } from "../utils/jwt-generator";
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
        const cart = Cart.create();

        await cart.save();
        newUser.cart = cart;
        await newUser.save();

        const jwtToken = generateJwt(newUser.id, newUser.email, newUser.role);

        return jwtToken;
    }
    async login(dto: UserDto) {
        const user = await User.findOne({ where: { email: dto.email } });
        if (!user) {
            throw new Error();
        }
        const isValidPassword = await bcrypt.compare(
            dto.password,
            user.passwordHash
        );
        if (!isValidPassword) {
            throw new Error();
        }
        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }
}
