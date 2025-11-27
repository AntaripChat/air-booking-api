import jwt from "jsonwebtoken";

export const auth = (roles: string[] = []) => {
  return (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;

      if (roles.length && !roles.includes((decoded as any).role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      next();

    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};
