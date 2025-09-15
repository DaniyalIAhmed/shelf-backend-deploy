import { Request, Response } from "express";
export declare const createBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBooks: (req: Request, res: Response) => Promise<void>;
export declare const deleteBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserBooks: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=book.controller.d.ts.map