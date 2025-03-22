import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Lottie from "lottie-react";
import blocked from '../../assets/blocked.json'
import { ImBlocked } from "react-icons/im";

function AuthorProfile() {
  const [authorStatus, setAuthorStatus] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setAuthorStatus(currentUser.isBlocked);
    }
  }, []); // Dependency array ensures useEffect runs only once

  return (
    <div>
      {authorStatus ? (
       <div>
       <Lottie animationData={blocked} loop={true} className="block"/>
       <div className="text-center text-danger text-2xl font-semibold"><ImBlocked className='text-danger me-1 mb-1' />Your account is blocked. Please contact the admin.</div>

       </div>

  
      ) : (
        <div className="author-profile">
          <ul className=" auth list-unstyled ">
            <li className="nav-item">
              <NavLink className="nav-link  ar" to="articles">
                Articles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link art" to="article">
                Add new Article
              </NavLink>
            </li>
          </ul>
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthorProfile;
