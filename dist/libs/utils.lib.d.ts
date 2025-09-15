import jwt from "jsonwebtoken";
export declare const generateToken: (userId: string) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
export declare const generateRefreshToken: (id: string) => string;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
//# sourceMappingURL=utils.lib.d.ts.map