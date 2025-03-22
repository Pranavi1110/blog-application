const exp=require('express')
const authorApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../modals/articleModel')
const {requireAuth}=require("@clerk/express")
require('dotenv').config()

// API
// authorApp.get("/",(req,res)=>{
//     res.send({message:"from author api"})
// })/

//create new author
authorApp.post('/author',expressAsyncHandler(createUserOrAuthor))

//create new article
authorApp.post('/article',expressAsyncHandler(async(req,res)=>{

    //get new article obj from req
    const newArticleObj=req.body
    const newArticle=new Article(newArticleObj)
    const articleObj=await newArticle.save()
    res.status(201).send({message:"Article published",payload:articleObj})

}))

//read all articles including his article

authorApp.get('/articles/:category',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    //read all articles from dtabase
    const cat=req.params.category
    // Construct query based on category
    const query = cat === "all" ? { isArticleActive: true } : { isArticleActive: true, category: cat };
    // Fetch filtered articles
    const listOfArticles = await Article.find(query);
    res.status(200).send({message:"Articles",payload:listOfArticles})
}))

//for unauthorized
authorApp.get('/unauthorized',(req,res)=>{
    res.send({message:"Unauthorized request"})
})

//modify an article by article id
authorApp.put('/article/:articleId',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    //send res
    res.status(200).send({message:"Article Modified",payload:latestArticle})
}))

//delete(soft delete) an article by article id
authorApp.put('/articles/:articleId', expressAsyncHandler(async(req,res)=>{
    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    //send res
    res.status(200).send({message:"Article Deleted or Restored",payload:latestArticle})
}))

module.exports=authorApp