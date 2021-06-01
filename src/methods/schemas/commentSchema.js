import mongoose from "mongoose"

const {Schema, model } =mongoose 


const commentSchema = new Schema({
  text: {type: String, required: true},
  user: {type: String, required: true},
  postId: {type: String, default:""},
}, {timestamps:true})


export default model("comments", commentSchema)