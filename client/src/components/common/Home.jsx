import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Lottie from "lottie-react";
import backgroundAnimation from "../../assets/background.json";
import authoricon from '../../assets/authoricon.json'
import usericon from '../../assets/usericon.json'
import adminicon from '../../assets/adminicon.json'
import { Link } from 'react-router-dom'
import { IoBookOutline } from "react-icons/io5";
import { LuClipboardPenLine } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import loadingic from '../../assets/loadingic.json'

function Home() {
  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
  const {isSignedIn,user,isLoaded}=useUser()
  const [error,setError]=useState("")
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
  const adminEmail="tandravaishnavi610@gmail.com"
  // isLoading(true)
  // setTimeout(()=>{
  //   setIsLoading(true)
  // },2000)


  // console.log("isSIgnedIn:",isSignedIn)
  // console.log("User:",user)
  // console.log("isLoaded:",isLoaded)


  async function onSelectRole(selectedRole) {
    //clear error property
    setError('')
    // const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    console.log(currentUser)
    let res = null;
    // setIsLoading(true)
    try {
      if (selectedRole === 'author') {
        console.log(currentUser.isBlocked)
        if(!currentUser.isBlocked){
        res = await axios.post(`${BACKEND_URL}/author-api/author`, currentUser)
        let { message, payload } = res.data;
        // console.log(message, payload)
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload })
          //save user to localstorage
          localStorage.setItem("currentUser",JSON.stringify(payload))
          // setError(null)
        } else {
          setError(message);
        }
      }else{
        setError("Your account is blocked. Please contact admin")
        return;
      }
      }
      if (selectedRole === 'user') {
        if(!currentUser.isBlocked){
        console.log(currentUser)
        res = await axios.post(`${BACKEND_URL}/user-api/user`, currentUser)
        let { message, payload } = res.data;
        console.log(message)
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload })
           //save user to localstorage
           localStorage.setItem("currentUser",JSON.stringify(payload))
        } else {
          setError(message);
        }
      }else{
        setError("Your account is blocked. Please contact admin")
        return;
      }
      }
      if(selectedRole==='admin' ){
        if( currentUser.email===adminEmail){
        res=await axios.post(`${BACKEND_URL}/admin-api/admin`, currentUser)
        let {message,payload}=res.data;
        if(message==='admin'){
          setCurrentUser({...currentUser,...payload})
          localStorage.setItem("currentUser",JSON.stringify(payload))
        }else{
          setError(message)
        }
      }else{
        setError("Only admin can access")
      }
    }
      
    } catch (err) {
      setError(err.message);
    }
    
  }
  
  
  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded]);
  
  

  useEffect(()=>{
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      console.log("first")
      navigate(`/author-profile/${currentUser.email}`);
    }
    if(currentUser?.role==="admin" && error.length===0){
      navigate(`/admin-profile/${currentUser.email}`)
    }

  },[currentUser])

  
  



  return (
    <div className='container'>
      {
        isSignedIn===false && <div className="container ">
        <div className="row align-items-center justify-content-center ">
          {/* Lottie Animation - Responsive Size */}
          <div className="col-lg-6 col-md-12 d-flex justify-content-center">
            <Lottie 
              animationData={backgroundAnimation} 
              loop={true} 
              className="lottie-animation"
            />
          </div>
      
          {/* Homegrid - Responsive & Centered */}
          <div className="col-lg-6 col-md-12 homegrid mt-4">
            <div className="text-light text-justify txt">
              <h4 className="mb-4 txt"><span className='ink'>Inkwave</span> - Let Your Words Flow</h4>
              <p>
                Welcome to Inkwave, a space where words hold power, stories spark emotions, and ideas shape the future.
              </p>
              <h5 className='txt'>What Awaits You?</h5>
              <div>
                <p><IoBookOutline /> Discover – Dive into engaging blogs and explore diverse perspectives.</p>
                <p><LuClipboardPenLine /> Create – Write, express, and share your unique thoughts with the world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>      
          
      }
      {
        isSignedIn===true && 
        <div className='pt-4 box'>
        <div className='name d-flex align-items-center justify-content-evenly p-3   rounded-4 '>
          <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
          <p className="siname text-light">Hello, {user.firstName}!</p>
        </div>
        <p className=" profile">Choose your role to begin!</p>
        {
          error.length!==0 && (
            <p className="text-danger er " style={{fontFamily:"sans-serif"}}>
                 {error}
            </p>
          )
        }
        {/* <div className='d-flex role-radio py-3 justify-conten-center'> */}

        {
          isLoading?(
            <div>
                <Lottie animationData={loadingic} loop={true} className="" style={{ width: "300px", height: "300px",margin:"auto" }} />
                </div>
        ):(
          <div className=" role-radio py-3 justify-content-center gap-4">
  <div onClick={() => onSelectRole("admin")} id='admin' style={{ cursor: "pointer", textAlign: "center" }}>
  <Lottie animationData={adminicon} loop={true} className="border border-light rounded-2 auth-an" style={{ width: "200px", height: "120px" }} />
  <div className='text-dark mt-3 rol'>Admin</div>
</div>
  <div onClick={() => onSelectRole("author")} id='author' style={{ cursor: "pointer", textAlign: "center" }}>
  <Lottie animationData={authoricon} loop={true} className="border border-light rounded-2 auth-an" style={{ width: "200px", height: "120px" }} />
  <div className='text-dark mt-3 rol'>Author</div>
</div>

<div onClick={() => onSelectRole("user")} id='user' style={{ cursor: "pointer", textAlign: "center" }}>
  <Lottie animationData={usericon} loop={true} className="border border-light rounded-2 auth-an" style={{ width: "200px", height: "120px" }} />
  <div className='text-dark mt-3   rol'>User</div>
</div>


</div>

        )
        }

        

        </div> 
      }
    </div>
  )
}

export default Home