import express from 'express';
import { getFilePath, getItems, getItemsFromFile, writeItems } from '../methods/fs-tools.js';
import {nanoid} from "nanoid"

const rc = express.Router();
const filePath = getFilePath("comments.json")

rc.get('/:id/comments',async(req, res, next) =>{
  try {
    let comments = await getItemsFromFile(filePath, req.params.id)
    res.status(200).send(comments)
  } catch (error) {
    next(error)
  }
})

rc.post('/:id/comments', async(req, res, next) =>{
  
  try {
    let comments = await getItems(filePath)
    console.log('req.body:', req.body)
    let comment = {...req.body, _id: req.params.id, id:nanoid(), createdAt:new Date(),updatedAt: new Date()}
    comments.push(comment)
    await writeItems(filePath, comments)
    res.status(201).send(comment._id)
  } catch (error) {
    
  }
})

rc.put('/:id/comments', (req, res, next) =>{
  try {
    
  } catch (error) {
    
  }
})

rc.delete('/:id/comments', (req, res, next) =>{
  try {
    
  } catch (error) {
    
  }
})

export default rc