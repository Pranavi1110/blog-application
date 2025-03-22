import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
import { useContext } from 'react'
import {FaEdit} from 'react-icons/fa'
import {MdDelete,MdRestore} from 'react-icons/md'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'


function ArticleByID() {
  const {state}=useLocation()
  const {currentUser}=useContext(userAuthorContextObj)
  const [editArticleStatus,setEditArticleStatus]=useState(false)
  const {register,handleSubmit,formState:{errors},reset}=useForm()
  const navigate=useNavigate()
  const {getToken}=useAuth()
  const [currentArticle,setCurrentArticle]=useState(state)
  const [commentStatus,setCommentStatus]=useState('')
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
  // const [commentdelete,setCommentDelete]=useState('')
  // const [errors,setErrors]=useState('')

  console.log("Current:",currentUser)




  //function to change edit status of article
  function enableEdit(){
    setEditArticleStatus(true)
  }

  //to save modified article
  async function onSave(modifiedArticle){
    //adding other properties for modifiedarticle based on article schema
    const ArticleAfterChanges={...state,...modifiedArticle}
    const token=await getToken()
    const currentDate=new Date()
    //add date of modification
    ArticleAfterChanges.dateOfModification=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()
    // console.log(modifiedArticle)

    //make http post req
    let res=await axios.put(`${BACKEND_URL}/author-api/article/${ArticleAfterChanges.articleId}`,ArticleAfterChanges,{
      headers:{
        Authorization:`Bearer ${token}`
      }

    })
    if(res.data.message==="Article Modified"){
      //change edit article status to false
    setEditArticleStatus(false)
    setCurrentArticle(res.data.payload)
    navigate(`/author-profile/articles/${state.articleId}`,{state:res.data.payload})
    } 
  }



  //add comment by user
  async function addComment(commentObj){
    //add name of user to comment obj(to match with comment schema)
    commentObj.nameOfUser=currentUser.firstName 
    commentObj.profileImageUrl=currentUser.profileImageUrl?currentUser.profileImageUrl:"https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    console.log(commentObj)
    //http put req(to add  comment to comments array in backend)
    let res=await axios.put(`${BACKEND_URL}/user-api/comment/${currentArticle.articleId}`,commentObj)
    if(res.data.message==='Comment Added'){
      setCommentStatus(res.data.message)
      setCurrentArticle(res.data.payload)
      reset()
    }
  }



  //delete article
   //delete article
   async function deleteArticle(){
    state.isArticleActive=false;
    let res=await axios.put(`${BACKEND_URL}/author-api/articles/${state.articleId}`,state)
    if(res.data.message==='Article Deleted or Restored'){
      setCurrentArticle(res.data.payload)
  }
  }

  async function deleteComment(commentId){
    try {
      const token = await getToken();
      if (!token) {
        console.error('Authentication token missing');
        return;
      }
    const res=await axios.delete(`${BACKEND_URL}/user-api/comment/${currentArticle.articleId}/${commentId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
    if(res.data.message==='comment deleted'){
      setCurrentArticle((prevArticle) => ({
        ...prevArticle,
        comments: prevArticle.comments.filter((comment) => comment._id !== commentId),
      }));
    }
  }catch(error){
    console.error("Error deleting comment:", error.response?.data || error.message);
  }
 }
 
  
  
  //restore article
  async function restoreArticle(){
    const updatedState = { ...state, isArticleActive: true };
    let res = await axios.put(`${BACKEND_URL}/author-api/articles/${state.articleId}`, updatedState);
    if(res.data.message === "Article Deleted or Restored"){
      setCurrentArticle(res.data.payload);
    }
  }


  return (
    <div className='container'>
    {
      editArticleStatus === false ? <>
        {/* print full article */}
        <div className="d-flex justify-content-between full_article">
          <div className="mb-5 author-block w-100 px-3 py-2 rounded-2 d-flex justify-content-between align-items-center">
            <div>
              <p className="title me-4">{state.title}</p>
              {/* doc & dom */}
              <span className="mt-4">
                <small className="text-secondary me-4">
                  Created on : {state.dateOfCreation}
                </small>
                <small className="text-secondary me-4">
                  Modified on : {state.dateOfModification}
                </small>
              </span>

            </div>
            {/* author details */}
            <div className="author-det text-center">
              <img src={state.authorData.profileImageUrl} width='60px' className='rounded-circle' alt="" />
              <p className='name-hi'>{state.authorData.nameOfAuthor}</p>
            </div>

          </div>
         
        </div>
        {/* content*/}
        <p className="lead mt-3 article-content" style={{ whiteSpace: "pre-line" }}>
          {state.content}
        </p>
        <div className='edits'>
           {/* edit & delete */}
           {
            currentUser.role === 'author' && (
              <div className="btns ">
                {/* edit button */}
                <button className="me-2 btn btn-success edit d-flex" onClick={enableEdit}>
                  <FaEdit  className='mt-1 me-1 edit'/>Edit
                </button>
                {/* if article is active,display delete icon, otherwise display restore icon */}
                {
                  currentArticle.isArticleActive === true ? (
                    <button className="me-2 btn btn-danger edit d-flex" onClick={deleteArticle}>
                      <MdDelete className='mt-1 me-1 edit' />Delete
                    </button>
                  ) : (
                    <button className="me-2 btn btn-info edit d-flex" onClick={restoreArticle}>
                      <MdRestore className='mt-1 me-1 edit' />Restore
                    </button>
                  )
                }
              </div>
            )
          }
        </div>
        {/* user commnets */}
        <div>
  <div className="comments my-4">
    {currentArticle.comments.length === 0 ? (
      <p className="comments">No comments yet..</p>
    ) : (
      <div>
        <p className="text-dark ps-2 pt-2 pb-2 rounded-2 bg-light comss">
          Comments
        </p>
        {currentArticle.comments.map((commentObj) => (
          
          <div key={commentObj._id} className='mb-2'> 
            <div className="d-flex comm">
              <img  className="rounded-4"style={{width:"20px",height:"20px",marginTop:"2px"}}src={commentObj.profileImageUrl?commentObj.profileImageUrl:"https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"} alt="" />
              <p className="user-name">{commentObj?.nameOfUser}:</p>
              <p className="comment">{commentObj?.comment}</p>
              {
                currentUser?.role==="user" && commentObj.nameOfUser===currentUser.firstName?<button className="btn  comdel" onClick={()=>deleteComment(commentObj._id)}><MdDelete className='text-danger mb-3' /></button>:""
              } 
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
        {/* comment form */}
        <h6 className='text-light com'>{commentStatus}</h6>
        {
          currentUser?.role==='user'&&<form onSubmit={handleSubmit(addComment)} className="comment-form">
          <input type="text" {...register("comment")} className="comment-input form-control" placeholder="Write a comment..." />
          <button className="comment-button btn btn-success">
            Add comment
          </button>
        </form>
        }
      </> :
        <form className='w-75 mx-auto formm'onSubmit={handleSubmit(onSave)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label text-light">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              defaultValue={state.title}
              {...register("title",{required:true})}
            />
            {errors.title && (
    <p className="text-danger mt-1">{ "Title is required"}</p>
  )}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="form-label text-light text-light">
              Select a category
            </label>
            <select
              {...register("category",{required:true})}
              id="category"
              className="form-select"
              defaultValue={state.category}
            >
              <option value="programming">Programming</option>
              <option value="AI&ML">AI&ML</option>
              <option value="database">Database</option>
              <option value="Designing">Design</option>
            </select>
          </div>
          {errors.category && (
    <p className="text-danger mt-1">{ "Category is required"}</p>
  )}
          <div className="mb-4">
            <label htmlFor="content" className="form-label text-light">
              Content
            </label>
            <textarea
              {...register("content",{required:true})}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
            ></textarea>
          </div>
          {errors.content && (
    <p className="text-danger mt-1">{ "Content is required"}</p>
  )}

          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
    }

  </div>
)
}

export default ArticleByID