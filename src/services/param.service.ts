import { Param } from "../entities/param.entity";

export class ParamService {
    async create(name: string, body: string) {
        try {
            const param = Param.create({ name, body });
            await param.save();
            return param;
        } catch (error) {
            throw error;
        }
    }

    async findByName(name: string) {
        try {
            const params = await Param.find({ name });
            return params;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const params = await Param.find();
            return params;
        } catch (error) {
            throw error;
        }
    }
}
