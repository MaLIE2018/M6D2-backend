import mongoose from "mongoose"

const {Schema, model, Model} = mongoose

const CommentSchema =  new Schema({
  text: {type: String, default: ""},
  user: {type: String, default: ""},
  updatedAt: {type: Date},
  createdAt: {type: Date}
})
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
  content: {type: String, required: true},
  comments:{type:[CommentSchema] ,default:[]}
},
{timestamps: true},
)


export default model("blogposts", blogSchema)
