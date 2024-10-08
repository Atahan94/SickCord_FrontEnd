import { InputAdornment} from "@mui/material";
import { VisibilityIcon } from "./icons";
import {
  StyledButton,
  ErrorBox,
  StyledTextField,
  StyledFormControl,
} from "../../materialUİElements/formMUİ";
import { useState, useEffect } from "react";
import { setToken } from "../../store/actions/authActions";
import { setUser } from "../../store/actions/userActions";
import { setSocket } from "../../store/actions/socketActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeSocket } from "../../serverConnection/socket";


const Login = ({ StyledHeading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ error: false, type: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  

  const loginUser = async ({ email, password }) => {
    let responseData = {};
    try {
      const response = await fetch("https://sickcord-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      return responseData;
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      throw error.message === "0"
        ? new Error(`User name or Password is wrong`)
        : new Error("Server is Down");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const {token, user} = await loginUser({ email, password }); // Call your loginUser function with form data
      dispatch(setToken(token));
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user));

      const socket = await initializeSocket(user.name);
      
      dispatch(setSocket(socket));
    
      navigate("/dashboard");
      // Redirect to login page after successful sign-up
    } catch (error) {
      /* console.error("Error signing up:", error); */
      setError({ error: true, type: error.message });
      // Handle error (e.g., display error message to user)
    }
  };
  return (
    <>
      <StyledHeading>Login</StyledHeading>
      {error.error ? <ErrorBox>{error.type}</ErrorBox> : ""}
      <StyledFormControl component="form" onSubmit={handleSubmit}>
        <StyledTextField
          label="E-mail"
          name="email"
          type="email"
          margin="dense"
          required
        />
        <StyledTextField
          required
          label="Password"
          name="password"
          margin="dense"
          type={showPassword ? "text" : "password"}
          InputProps={{
            // Customize InputProps to include endAdornment
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityIcon
                  toggle={showPassword}
                  action={handleClickShowPassword}
                />
              </InputAdornment>
            ),
          }}
        />
        <StyledButton type="submit" variant="contained" color="primary">
          Submit
        </StyledButton>
      </StyledFormControl>
    </>
  );
};

export default Login;
