import express from 'express'
import { login, logout, register,registerOrLogin, addAddress,getAllAddresses, getHomeProducts} from '../controllers/userController'
import { authenticateUser } from '../middleware/authenticateUser'
import { getUserCartProducts, addProductToCart, deleteProductFromCart, clearCart } from '../controllers/cartController'

export const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",authenticateUser ,logout)
userRouter.post("/checkout/signing",registerOrLogin)
userRouter.post("/addAddress",authenticateUser,addAddress)
userRouter.get("/getAllAddresses",authenticateUser,getAllAddresses)
userRouter.get("/getHomeProducts",authenticateUser,getHomeProducts)

userRouter.get("/getCartProducts",authenticateUser,getUserCartProducts)
userRouter.post("/addProductToCart",authenticateUser,addProductToCart)
userRouter.delete("/deleteCartProduct",authenticateUser,deleteProductFromCart)
userRouter.delete("/clearCart",authenticateUser,clearCart)