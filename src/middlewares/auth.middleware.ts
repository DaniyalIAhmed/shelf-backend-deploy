import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../libs/utils.lib";
import { User } from "../models/user.model";

export const protectRoute = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "Unauthorized, No token provided" });
        }
        const decoded = verifyToken(token);
        const userId = typeof decoded === "string" ? decoded : (decoded as { id?: string }).id;
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(401).json({ message: "Invalid Token" });
        }
        (req as Request & { user?: typeof user }).user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}