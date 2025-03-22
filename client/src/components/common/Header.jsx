import {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk,useUser } from '@clerk/clerk-react' 
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
// import { motion } from "framer-motion";
import Lottie from "lottie-react";
import blogLogo from '../../assets/blog-logo.json'
import { MdOutlineWavingHand } from "react-icons/md";
import { useEffect } from 'react';


function Header() {
    const {signOut}=useClerk()
    const {isSignedIn,user,isLoaded}=useUser()
    const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
    const navigate=useNavigate()



    //function to signout
    async function handleSignout(){
        await signOut();
        setCurrentUser(null)
        localStorage.clear()
        navigate("/")
    }

  return (
    <div>
        <nav className='header d-flex justify-content-between align-items-center'>
            <div className='d-flex justify-content-center'>
                <Link to="/">
  <Lottie animationData={blogLogo} loop={true} style={{ width: 70, height: 70 }} />
                </Link>
            </div>
            <ul className="d-flex  list-unstyled  header-links ">
                
                {
                    isSignedIn ?
                    (
                        <div className='user-button'>
<p className="role text-light mt-3  " style={{position:"absolute",right:"50px",top:"70px"}}>Hey {currentUser?.role}!<MdOutlineWavingHand  className='ms-2'/></p>
                    <button className='btn btn-danger signedout-btn' onClick={handleSignout}>Signout</button>
                </div>
                    ):(
                    <>
                        <li className='lin'><Link className='lin' to="/">Home</Link></li>
                        <li className='lin'><Link className='lin' to="signin">Signin</Link></li>
                        <li className='lin'><Link className='lin' to="signup">Signup</Link></li>
                    </>
                    )
                
                }
                
            </ul>
        </nav>
    </div>
  )
}

export default Header