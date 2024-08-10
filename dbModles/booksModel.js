const mongoose=require("mongoose")
const booksSchema=new mongoose.Schema({
    name:{
        type:String
    },
    author:{
        type:String,
    },
    price:{
        type:Number,
        default:9.9
    },
    is_hot:{
        type:String,
        default:"1"
    },
    image_url:{
        type:String,
    }
})
const booksModel=mongoose.model('earlyBooks',booksSchema)
module.exports=booksModel