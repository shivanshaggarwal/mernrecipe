import express from 'express'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from '../models/Users.js';
const router = express.Router();

router.post('/register', async (req,res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})
    try{
        if(user){
            res.status(409).json({msg:"User already registered!"})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new UserModel({username, password: hashedPassword})
            await newUser.save();
            res.json({msg: "User Registered Successfully!"})
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
    
})

router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})
    try{
        if(!user){
            res.status(404).json({msg:"User not found"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        console.log(isPasswordValid)
        if(!isPasswordValid){
            return res.status(404).json({msg:"Password incorrect"})
        }else{
            console.log("runing")
            const token = jwt.sign({id: user._id}, "secret");
            res.json({token, userId: user._id})
        }
    }
    catch(error){
        res.status(400).json({msg:"Internal server error"})
    }
})

export {router as userRouter}