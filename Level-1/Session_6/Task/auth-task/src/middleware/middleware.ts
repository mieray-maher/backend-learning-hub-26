import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const authorization = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies?.token;

    if(!token){
        return res.status(400).json({
            msg : "Unathorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id : number, role : string}

        if(decoded.role !== "admin"){
            return res.status(404).json({
                msg : "Unauthorized"
            });
        }

        next();

    }
    catch{
        res.status(400).json({
            msg : "Invalid token"
        });
    }
}


export {authorization, authentication}