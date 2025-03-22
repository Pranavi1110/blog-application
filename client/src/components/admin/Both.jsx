

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import Lottie from "lottie-react";
import loadingic from '../../assets/loadingic.json'

function Both() {
    const [both, setBoth] = useState([]);
    const [error, setError] = useState("");
    // const [blockStatus,setBlockStatus]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const { getToken } = useAuth();
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

    // Fetch users
    async function getBoth() {
        setIsLoading(true)
        try {
            const token = await getToken();
            const res = await axios.get(`${BACKEND_URL}/admin-api/both`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.message === "Both Users and Authors") {
                setBoth(res.data.payload);
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError("Failed to fetch users");
        }
        finally{
            setTimeout(()=>{
                setIsLoading(false)
            },1000)
        }
    }

    useEffect(() => {
        getBoth();
    }, []);



    

    // Function to toggle block/unblock
async function toggleBlock(email, isBlocked) {
        try {
            const token = await getToken();
            const res = await axios.put(
                `${BACKEND_URL}/admin-api/both`,
                { email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (res.data.message === "User/Author updated successfully") {
                // Compute new block state first
                const newBlockedState = !isBlocked;
    
                setBoth((prevBoth) =>
                    prevBoth.map((both) =>
                        both.email === email
                            ? {
                                  ...both,
                                  isBlocked: newBlockedState,
                                  isActive: newBlockedState ? "Blocked" : "Active", // Use updated value
                              }
                            : both
                    )
                );
            }
        } catch (err) {
            console.error("Failed to update user status:", err);
        }
    }
    

    return (
        <div>
            {error && <p className="text-danger">{error}</p>}
            {isLoading ? (
                <div>
                    <Lottie animationData={loadingic} loop={true} className="load" style={{ width: "300px", height: "300px",margin:"100px 500px" }} />
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="table table-dark tb mx-auto">
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {both.map((bothObj) => (
                                <tr key={bothObj.email}>
                                    <td>
                                        <img src={bothObj.profileImageUrl} alt="Profile" />
                                    </td>
                                    <td>{bothObj.firstName}</td>
                                    <td className="text-light">{bothObj.email}</td>
                                    <td>{bothObj.role}</td>
                                    <td>{bothObj.isActive}</td>
                                    <td>
                                        <button
                                            className={`btn m-2 ${bothObj.isBlocked ? "btn-success" : "btn-danger"}`}
                                            onClick={() => toggleBlock(bothObj.email, bothObj.isBlocked)}
                                        >
                                            {bothObj.isBlocked ? "Unblock" : "Block"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}    
export default Both;
