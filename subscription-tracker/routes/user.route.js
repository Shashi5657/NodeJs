import { Router } from "express";

const userRouter = Router()

userRouter.get('/users', (req,res)=> res.send('get all users'))
userRouter.get('/users/:id', (req,res)=> res.send('get single users'))