import bcrypt from "bcrypt";
import { generateJwt } from "../utils/jwt-generator";
import { UserDto } from "../dto/user.dto";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";
import { ErrorHandler } from "../utils/error.handler";
import {
    USER_ALREADY_EXISTS,
    USER_NOT_FOUND,
    WRONG_PASSWORD,
} from "../utils/error.constants";

export class UserService {
    async register(dto: UserDto) {
        try {
            const user = await User.findOne({ where: { email: dto.email } });
            if (user) {
                throw ErrorHandler.incorrectRequest(USER_ALREADY_EXISTS);
            }
            const passwordHash = await bcrypt.hash(dto.password, 7);
            const newUser = User.create({ email: dto.email, passwordHash });
            const cart = Cart.create();

            await cart.save();
            newUser.cart = cart;
            await newUser.save();

            const jwtToken = generateJwt(
                newUser.id,
                newUser.email,
                newUser.role
            );

            return jwtToken;
        } catch (error) {
            throw error;
        }
    }
    async login(dto: UserDto) {
        try {
            const user = await User.findOne({ where: { email: dto.email } });
            if (!user) {
                throw ErrorHandler.notFound(USER_NOT_FOUND);
            }
            const isValidPassword = await bcrypt.compare(
                dto.password,
                user.passwordHash
            );
            if (!isValidPassword) {
                throw ErrorHandler.incorrectRequest(WRONG_PASSWORD);
            }
            const token = generateJwt(user.id, user.email, user.role);
            return token;
        } catch (error) {
            throw error;
        }
    }
}
