import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Lottie from "lottie-react";
import blocked from '../../assets/blocked.json'
import { ImBlocked } from "react-icons/im";


function UserProfile() {
  const [userStatus,setUserStatus]=useState(null)
  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserStatus(currentUser.isBlocked);
    }
  },[])
  return (
    <div>
      {userStatus ? (
        <div>
         <Lottie animationData={blocked} loop={true} className="block"/>
         <div className="text-center text-danger text-2xl font-semibold"><ImBlocked className='text-danger me-1 mb-1' />Your account is blocked. Please contact the admin.</div>

         </div>
      ):(
        <>
      <ul className="d-flex justify-conetent-around list-unstyled fs-3">
          <li className="nav-item">
                <Link className="nav-link ar" to='articles' >Articles</Link>
          </li>
      </ul>
      <div className="mt-5">
        <Outlet/>
      </div>
      </>
      )}
    </div>
  )
}

export default UserProfile