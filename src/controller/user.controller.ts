import userServices from "../services/user.service";
import { Request,Response } from "express";
import jwt from "jsonwebtoken";

export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const user = await userServices.registerUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as { email: string; password: string };

      const user = await userServices.loginUser(email, password);

      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }

      // Create JWT Token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });

    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
