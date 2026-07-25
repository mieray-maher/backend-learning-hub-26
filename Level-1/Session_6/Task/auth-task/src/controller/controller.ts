import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users , User } from "../Data/data";

const maxAge = 60 * 60; 

const createToken = (id: number, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: maxAge,
  });
};

// Signup part 

const singup = async (req:Request, res:Response)=>{
    try{
        const {username, email, password} = req.body;

        const userexists = users.find( u => u.email === email);

        if(userexists){
            return res.status(404).json({
                message: "User already exists"
            })
        }

        const hashedpass = await bcrypt.hash(password,10);

        const newUser : User = {
            id : users.length + 1,
            username, 
            email, 
            password: hashedpass,
            role : "user"
        }

        users.push(newUser);

        res.status(201).json({
            message : "Created successfully"
        });
    }
    catch{
        res.status(500).json({
            messgae: "server error"
        });
    }
}


//signin part

const signin = async (req:Request, res:Response) =>{
    try{
        const {email, password} = req.body;

        const userexists = users.find(u => u.email === email);

        if(!userexists){
            return res.status(404).json({
                message : "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, userexists.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password" })
        }

        const token = createToken(userexists.id, userexists.role);

        res.cookie("token", token, {
            httpOnly:true,
            maxAge : maxAge*1000
        });

        res.status(200).json({
            message: "Login was successful"
        });
    }
    catch{
        res.status(500).json({
            message : "server error"
        });
    }
}

//singout part
const singout = (req:Request, res:Response)=>{
    res.clearCookie("token");

    res.status(200).json({
        message : "logout was successful"
    });
}

const profile = (req:Request, res:Response)=>{
    res.status(200).json({
        message: "You are authenticated"
    });
}

const adminonly= (req:Request, res:Response)=>{
    res.status(200).json({ message: "Welcome, admin!" });
}

export {singup, signin, singout, profile, adminonly}