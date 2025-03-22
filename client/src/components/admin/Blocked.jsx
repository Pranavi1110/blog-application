import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'

function Blocked() {
    const [blocked,setBlocked]=useState([])
    const [error,setError]=useState('')
    const {getToken}=useAuth()
    async function getBlocked(){
        try{
            const token=await getToken()
            const res=await axios.get('http://localhost:3000/admin-api/blocked',{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            })
            if(res.data.message==='Blocked List'){
                setBlocked(res.data.payload)
            }else{
                setError(res.data.message)
            }
        }catch(err){
            setError('Failed to fetch blocked')
        }
    }
    useEffect(()=>{
        getBlocked()
    },[])

  return (
    <div>
        {error && <p className="text-danger">{error}</p>}
        {
            blocked.map((blockedObj)=>(
                <div key={blockedObj.email}>
                    <p className='text-light'>{blockedObj.firstName}</p>
                    <p className='text-light'>{blockedObj.email}</p>
                </div>
            ))
        }

    </div>
  )
}

export default Blocked