import React from 'react'
import { createContext } from 'react'
import { useState,useEffect } from 'react'
export const userAuthorContextObj=createContext()

function UserAuthorContext({children}) {
    //getting state from clerk
    let [currentUser,setCurrentUser]=useState({
        firstName:'',
        lastName:"",
        email:"",
        profileImageUrl:"",
        role:""
    })

    //page refresh
    useEffect(()=>{
      const userInStorage=localStorage.getItem('currentUser')
      if(userInStorage){
        setCurrentUser(JSON.parse(userInStorage))
      }
    },[])

  return (
    <userAuthorContextObj.Provider value={{currentUser,setCurrentUser}}>
        {children}
    </userAuthorContextObj.Provider>
  )
}

export default UserAuthorContext;