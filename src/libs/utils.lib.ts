import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateToken = (userId: string)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET||"", {expiresIn: "15d"});
}
export const verifyToken = (token: string)=>{
    return jwt.verify(token, process.env.JWT_SECRET||"");
}
export const generateRefreshToken = (id: string)=>{
    return jwt.sign({id}, process.env.JWT_SECRET||"", {expiresIn: "7d"});
}
export const comparePassword = async (password: string, hashedPassword: string)=>{
    return await bcrypt.compare(password, hashedPassword);
}