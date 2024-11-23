import { model, Schema } from "mongoose";

const categoryChema=new Schema({
    productId:[String],
    title:{type:String,required:true},
    image:String,
})


export const Category=model("Category",categoryChema)