import mongoose from "mongoose"

const {Schema, model} = mongoose

const blogSchema = new Schema({
  category: {type: String, required: true},
  title: {type: String, required: true},
  cover: {type: String, default: ""},
  readTime: {
    value: {type: Number, required: true},
    unit: {type: String, default: "minute"}
  },
  author: {
    name: {type: String, required: true},
    avatar:{type: String, default: ""}
  },
  content: {type: String, required: true} 
},
{timestamps: true},
)

export default model("blogposts", blogSchema)
