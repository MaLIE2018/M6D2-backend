import mongoose from "mongoose";


const {Schema, model} = mongoose

const authorSchema = new Schema({
  name: {type: String, required: true},
  avatar:{type: String, default: ""},
  email: {type: String, required: true},
  dateOfBirth:{type: Date, required: true},
  blogPosts:[{type: Schema.Types.ObjectId, ref: "blogposts"}, {default:[]}]
}, {timestamps: true})


authorSchema.post("validate", function(error,doc, next){
  if(error){
    next(createError(400, {errorList: error}))
  }else{
    next()
  }
})


export default model("authors", authorSchema)