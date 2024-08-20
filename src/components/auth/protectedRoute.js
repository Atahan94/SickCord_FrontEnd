import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken} from '../../store/actions/authActions';


const ProtectedRoute  = ({ children }) => {
  const [session, setSession] = useState(true);
  const dispatch = useDispatch();

  const {token} = useSelector((state) => state.auth)
  

  const updateToken = async () =>{
   try{ const response = await fetch("https://sickcord-backend.onrender.com/token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
   const responseData = await response.json();

   console.log("PROTECTED TOken", responseData);
   
    if (responseData.error === "There is no session") {
      setSession(false);
    } else {
      dispatch(setToken(responseData.token));
      setSession(true);
    }}
    catch(error){
      console.error("Reason of the error", error);
    // Handle error appropriately
    setSession(false);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
    if (!token) {
        await updateToken();
      }
    };
    fetchData();
  }, [token])
  

  if (!session) {
    return <Navigate to="/" />;
  }
  

  return children;
};

export default ProtectedRoute;