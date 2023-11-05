import { Schema, Model } from "mongoose";
import { baseEntityModel } from "./baseEntity.model";

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  //TODO: Extend the model accordingly

  // Base entity
  ...baseEntityModel,
});

// User model
export const UserModel = new Model("User", UserSchema);
