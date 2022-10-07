import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";
import userModel from "../mongoose/UserModel";

export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels.map((userMongooseModel) => {
            return new User(
                userMongooseModel?._id.toString()??'',
                userMongooseModel?.username??'',
                userMongooseModel?.password??'',
                userMongooseModel?.firstName??'',
                userMongooseModel?.lastName??'',
                userMongooseModel?.email??'',
            );
        });
        return userModels;
    }

    async findUserById(uid: string): Promise<User | null> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
            userMongooseModel?.firstName??'',
            userMongooseModel?.lastName??'',
            userMongooseModel?.email??'',
        );
    }

    async createUser(user: User): Promise<User> { // void return doesn't work as expected
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
            userMongooseModel?.firstName??'',
            userMongooseModel?.lastName??'',
            userMongooseModel?.email??'',
        );
    }

    async deleteUser(uid: string):  Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {
            $set: {
                uid: user.getUid,
                username: user.uName,
                password: user.pass,
                firstName: user.getFirstName,
                lastName: user.getLastName,
                email: user.getEmail,
            }
        });

    }
}
