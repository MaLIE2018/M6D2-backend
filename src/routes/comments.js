import express from 'express';
import { getFilePath, getItems, getItemsFromFile, writeItems } from '../methods/fs-tools.js';
import {nanoid} from "nanoid"
import commentModel from "../methods/schemas/commentSchema.js" 
const rc = express.Router();
const filePath = getFilePath("comments.json")
import blogModel from "../methods/schemas/schema.js"


rc.get('/:id/comments',async(req, res, next) =>{
  try {

    // let comments = await getItemsFromFile(filePath, req.params.id)
    let blogPost = await blogModel.findById(req.params.id)
    res.status(200).send(blogPost.comments)
  } catch (error) {
    next(error)
  }
})

rc.get('/:id/comments/:commentId',async(req, res, next) =>{
  try {
    // let comments = await getItemsFromFile(filePath, req.params.id)
    let comment =  await blogModel.find({_id:req.params.id},{comments:{$elemMatch:{_id:req.params.commentId}}})
    // let comments = await commentModel.find({postId:`${req.params.id}`})
    res.status(200).send(comment)
  } catch (error) {
    next(error)
  }
})

rc.post('/:id/comments', async(req, res, next) =>{
  
  try {
    // let comments = await getItems(filePath)
    console.log('req:', req.body)
    const comment = {...req.body, updatedAt: new Date(), createdAt: new Date()}
    const blogPost = await blogModel.findByIdAndUpdate(req.params.id, {$push:{comments:comment}},{runValidators: true, new:true})

    // const {_id} = await newComment.save()

    // console.log('req.body:', req.body)
    // let comment = {...req.body, _id: req.params.id, id:nanoid(), createdAt:new Date(),updatedAt: new Date()}
    // comments.push(comment)
    // await writeItems(filePath, comments)
    res.status(201).send({_id:blogPost._id})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

rc.put('/:id/comments/:commentId', async (req, res, next) =>{
  try {
    const comment =  await blogModel.find({_id:req.params.id},{comments:{$elemMatch:{_id:req.params.commentId}}})
    const newComment = {...comment[0].comments[0].toObject(), ...req.body, updatedAt: new Date()}
    const blogPost = await blogModel.findOneAndUpdate(
    {_id:req.params.id, "comments._id":req.params.commentId},
    {$set:{"comments.$":newComment}}
    ,{runValidators: true, new:true})
    res.status(200).send({_id: blogPost._id})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

rc.delete('/:id/comments/:commentId', async (req, res, next) =>{
  try {
    const blogPost = await blogModel.findByIdAndUpdate(req.params.id, {$pull:{comments:{_id: req.params.commentId}}},{runValidators: true, new:true})
    res.status(204).send({_id:blogPost._id})
  } catch (error) {
    console.log(error)
    next(error)
  }
})



export default rc