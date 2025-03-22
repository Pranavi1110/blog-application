import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function AdminProfile() {
  return (
    <div className='admin-profile'>
      {/* Centering the Admin Dashboard */}
      <ul className="d-flex justify-content-center list-unstyled fs-3">
        <li className="nav-item w-100 text-center">
          <Link 
            className="nav-link text-light dash fw-bold"
            to="both"
            style={{ fontSize: "clamp(1rem, 4vw, 1.5rem)",marginTop:"50px" }} 
          >
            Admin Dashboard
          </Link>
        </li>
      </ul>

      {/* Content Below */}
      <div className="mt-5">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminProfile
