import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { compare as bcryptCompare } from 'bcrypt';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async create(user: UserDTO) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email });
        if (user && await bcryptCompare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

}
