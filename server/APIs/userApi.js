const exp=require('express')
const userApp=exp.Router()
const UserAuthor=require("../modals/userAuthorModel")
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../modals/articleModel')

// API
// userApp.get("/users",async(req,res)=>{
//     //get all users
//     let usersList=await UserAuthor.find()
//     res.send({message:"Users",payload:usersList})
// })

//create new user(post req) 
//function call to create user or author
userApp.post('/user',expressAsyncHandler(createUserOrAuthor))

//add comment(it is put req)
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body
    //add comment obj to comments array of article
    const articleWithComments=await Article.findOneAndUpdate({articleId:req.params.articleId},{$push:{comments:commentObj}},{returnOriginal:false})
    //send res
    res.status(200).send({message:"Comment Added",payload:articleWithComments})

}))

//delete comment
userApp.delete('/comment/:articleId/:commentId',expressAsyncHandler(async(req,res)=>{
    const {articleId,commentId}=req.params;
    try{
        const updatedArticle = await Article.findOneAndUpdate(
            { articleId },
            { $pull: { comments: { _id: commentId } } }, // Remove the comment from the array
            { returnOriginal: false }
        );

        if (!updatedArticle) {
            return res.status(404).send({ message: "Article not found" });
        }

        res.send({ message: "comment deleted", payload: updatedArticle });
    }catch(error){
        res.status(500).send({message:"Error deleting comment",error:error.message})
    }
}))




module.exports=userApp