import { Request, Response } from "express";
import { User } from "../models/user.model";
import { comparePassword, generateToken } from "../libs/utils.lib";


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${email.toLowerCase().split("@")[0]}`;
        const user = await User.create({ name, email, password, profileImage });
        const token = generateToken(user._id.toString());
        // const refreshToken = generateRefreshToken(user._id);
        res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, createdAt: user.createdAt } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        if(!(await comparePassword(password, user.password))){
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = generateToken(user._id.toString());
        res.status(200).json({ token, user: { _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, createdAt: user.createdAt } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const logout = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
}