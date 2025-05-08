
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { envVariables } from "../common/envVariables.js";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        envVariables.JWT_SECRET,
        {
            expiresIn: envVariables.JWT_LIFETIME
        }
    )
}

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = model("User", UserSchema);
export default User;