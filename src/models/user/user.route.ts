import express from "express"
import { userController } from "./user.controller"



const router=express.Router()


router.post("/create-user",userController.createUser)
router.get("/all-user",userController.getAllUser)
router.get("/all-user/:userId",userController.getUserDetails)




export const userRoutes=router