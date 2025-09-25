import express from 'express'
import { login, logout, register,registerOrLogin, addAddress, updateAddress, getAllAddresses, getHomeProducts} from '../controllers/userController'
import { authenticateUser } from '../middleware/authenticateUser'
import { getUserCartProducts, addProductToCart, deleteProductFromCart, clearCart } from '../controllers/cartController'
import { getAllOrders, placeOrder, getOrderDetails, getPdfOrder } from '../controllers/orderController'

export const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",authenticateUser ,logout)
userRouter.post("/checkout/signing",registerOrLogin)
userRouter.post("/addAddress",authenticateUser,addAddress)
userRouter.patch("/updateAddress",authenticateUser,updateAddress)
userRouter.get("/getAllAddresses",authenticateUser,getAllAddresses)
userRouter.get("/getHomeProducts",authenticateUser,getHomeProducts)

userRouter.post("/placeOrder",authenticateUser,placeOrder)
userRouter.get("/getAllOrders",authenticateUser,getAllOrders)
userRouter.get("/order/:id",authenticateUser,getOrderDetails)
userRouter.get("/getPdfOrder/:id",authenticateUser,getPdfOrder)

userRouter.get("/getCartProducts",authenticateUser,getUserCartProducts)
userRouter.post("/addProductToCart",authenticateUser,addProductToCart)
userRouter.delete("/deleteCartProduct",authenticateUser,deleteProductFromCart)
userRouter.delete("/clearCart",authenticateUser,clearCart)