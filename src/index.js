import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from '../routes/users.js';
const app = express();

app.use(cors())
app.use(express.json())
// app.use((req,res,next)=>{
//     console.log(req.path, req.method)
//     next();
// })
// routes
app.use("/auth", userRouter);
mongoose.connect("mongodb+srv://shivansh2512:Ptanhi1234@recipes.iysuqju.mongodb.net/Recipes?retryWrites=true&w=majority")


app.listen(5000, ()=>{
    console.log("Server started at", 5000)
})