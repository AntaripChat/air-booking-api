import bcrypt from "bcrypt";
import { User, IUser } from "../model/user.model";

class UserService {
  async registerUser(data: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const user = new User({
      ...data,
      password: hashedPassword,
    });

    return await user.save();
  }

  async loginUser(email: string, password: string): Promise<IUser | null> {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }
}

export default new UserService();
