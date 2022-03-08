import mongoose from "mongoose";

/**
 * UserAttrs
 * An Interface that describes the properties that are required to create a new User
 */
interface UserAttrs {
  email: string;
  password: string;
}
/**
 * UserModel
 * An Interface that describes the properties that a User Model has
 * @extends mongoose.Model
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * UserDoc
 * An Interface that describes the properties that a User Document has
 * @extends mongoose.Document
 */
interface UserDoc extends mongoose.Document{
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };