import express from 'express'
import { login, register, addAddress,getAllAddresses} from '../controllers/userController'
import { authenticateUser } from '../middleware/authenticateUser'
import { getUserCartProducts } from '../controllers/cartController'

export const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/addAddress",authenticateUser,addAddress)
userRouter.get("/getAllAddresses",authenticateUser,getAllAddresses)

userRouter.get("/getCartProducts",authenticateUser,getUserCartProducts)
