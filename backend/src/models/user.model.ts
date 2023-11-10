import {model, Model, Schema} from "mongoose"
import {baseEntityModel, IBaseEntity} from "./baseEntity.model";

export interface IUser extends IBaseEntity {
	fullName: string;
	userName: string;
	password: string;
	email: string;
	salt: string;
}

interface UserModel extends Model<IUser> {
	findActives(): any
}

export const userScheme = new Schema<IUser, UserModel>({
	fullName: String,
	userName: String,
	password: String,
	email: String,
	salt: String,
	...baseEntityModel
})
userScheme.statics.findActives = function () {
	return this.find({active: true});
}


export const User = model<IUser, UserModel>("User", userScheme);