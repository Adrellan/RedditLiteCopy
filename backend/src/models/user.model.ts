import {model, Model, Schema} from "mongoose"
import {baseEntityModel, IBaseEntity} from "./baseEntity.model";

interface IUser extends IBaseEntity {
	fullName: string;
	userName: string;
	password: string;
	email: string;
}

interface UserModel extends Model<IUser> {
	findActives(): any
}

export const userScheme = new Schema<IUser, UserModel>({
	...baseEntityModel
})
userScheme.statics.findActives = function () {
	return this.find({active: true});
}


export const User = model<IUser, UserModel>("User", userScheme);

