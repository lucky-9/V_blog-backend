const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000
    },
    author:{
        type:ObjectId,
        ref:"User",
    },
    likes: {
        type:Number,
        default:0
    }
},{timestamps:true});


module.exports = mongoose.model("Blog", blogSchema);