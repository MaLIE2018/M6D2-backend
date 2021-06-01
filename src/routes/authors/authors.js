import express from 'express';
import { nanoid } from 'nanoid'
import {getItems, writeItems, getFilePath} from '../../methods/fs-tools.js'
import {pipeline} from "stream"
import { Transform } from 'json2csv';
import {createFileStream} from "../../methods/csv.js"
const ARouter = express.Router();
const filePath = getFilePath('authors.json')


// ********************Requests******************************
ARouter.get('/', async (req, res, next) => {
  try {
    res.status(200).send(await getItems(filePath))
  } catch (error) {
    next(error)
  }
  
})

ARouter.get('/csv', async (req, res, next) => {
  try {
    const fields = ['name', 'surname', 'email', "dateOfBirth", "avatar", "_id"];
    const opts = { fields };
    const json2csv = new Transform(opts)
    res.setHeader("Content-Disposition", `attachment; filename=export.csv`)
    pipeline(createFileStream(), json2csv, res, error => {if(error){
      next(error)
    }})
    res.status(200).send(await getItems(filePath))
  } catch (error) {
    next(error)
  }
  
})
ARouter.get('/:id', async (req, res) => {
  try {
    const authors = await getItems(filePath)
    res.status(200).send(authors.filter(a =>a._id === req.params.id))
  } catch (error) {
    
  }
})

ARouter.post('/', async (req, res) => {
  try {
    let author = req.body
    let authors = await getItems(filePath)
    if(!authors.some(a =>a.email === author.email)){
      author = {...author, _id:nanoid(), createdAt: new Date()}
      authors.push(author)
      writeItems(filePath, authors)
      res.status(201).send()
    }else{
      res.status(200).send("Sorry, the email already exists!")
    }
  } catch (error) {
    
  }  
  
})
// Validator as Middleware here
ARouter.put('/:id', async (req, res) => {
  try {
    const author = {...req.body, _id: id}
    let authors = await getItems(filePath)
    authors.filter(a => a._id !== req.params.id)
    authors.push(author)
    writeItems(filePath, authors)
    res.status(201)
  } catch (error) {
    
  }
 
})
ARouter.delete('/:id', async (req, res) => {
  try {
    let authors = await getItems(filePath)
    authors.filter(a => a._id !== req.params.id)
    writeItems(filePath, authors)
    res.status(204).send()
  } catch (error) {
    
  }
  
})

export default ARouter;