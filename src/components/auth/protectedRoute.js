import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken} from '../../store/actions/authActions';
import Cookies from 'js-cookie';

const ProtectedRoute  = ({ children }) => {
  const [session, setSession] = useState(true);
  const dispatch = useDispatch();

  const {token} = useSelector((state) => state.auth)/*  || localStorage.getItem('authToken'); */
  const sessionCookie = Cookies.get('sessId');

  const updateToken = async () =>{
   try{ const response = await fetch("http://localhost:3000/token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
   const responseData = await response.json();

   console.log("PROTECTED TOken", responseData);
   
    if (responseData.error === "There is no session") {
      Cookies.remove('sessId');
      setSession(false);
    } else {
      dispatch(setToken(responseData.token));
    }}
    catch(error){
      console.error("Reason of the error", error);
    // Handle error appropriately
    Cookies.remove('sessId');
    setSession(false);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
    if (sessionCookie && !token) {
        await updateToken();
      }
    };
    fetchData();
  }, [sessionCookie, token, dispatch])

  if (!sessionCookie || !session) {
    return <Navigate to="/" />;
  }
  

  return children;
};

export default ProtectedRoute;