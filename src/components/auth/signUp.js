import { useTheme, InputAdornment } from "@mui/material";
import { VisibilityIcon } from "./icons";
import {
  StyledTextField,
  StyledButton,
  ErrorBox,
  StyledFormControl,
} from "../../materialUİElements/formMUİ";
import { StyledBox, StyledIcon } from "../../materialUİElements/backDropMUİ";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const SignUp = ({ StyledHeading }) => {
  const [error, setError] = useState({ error: false, type: "" });
  const [passwordConfirm, setpasswordConfirm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const curTheme = useTheme();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    // Handle the selected files
    if (fileList && fileList[0]) {
      const file = fileList[0];
      setSelectedImage(URL.createObjectURL(file));
    }
    console.log(fileList);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    // Handle the dropped files
    if (fileList && fileList[0]) {
      const file = fileList[0];
      setSelectedImage(URL.createObjectURL(file));
    }
    console.log(fileList);
  };

  const handleBoxClick = () => {
    // Open the file input when the box is clicked
    fileInputRef.current.click();
  };

  const signUpUser = async (formData) => {
    let responseData = {};
    try {
      const response = await fetch(
        "https://sickcord-backend.onrender.com/signup",
        {
          method: "POST",
          body: formData,
        }
      );

      responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /*  if (error.message === "11000") {
        throw new Error("Email already in use");
      } */
      console.log("Catch:", error.message);
      throw error.message === "11000"
        ? new Error(
            `${
              responseData.email !== undefined ? "Email" : "Name"
            } already in use`
          )
        : new Error("Server is Down");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      if (fileInputRef.current.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }
      else{
        throw new Error("You need to upload image")
      }
      await signUpUser(formData); // Call your signUpUser function with form data
      if (passwordConfirm) {
        navigate("/");
      } // Redirect to login page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error);
      setError({ error: true, type: error.message });
    }
  };

  const onChangePassword = () => {
    const passwordField1 = document.querySelector('input[name="password"]');
    const passwordField2 = document.querySelector(
      'input[name="confirmPassword"]'
    );

    const password1 = passwordField1.value;
    const password2 = passwordField2.value;

    if (password1 === password2) {
      setpasswordConfirm(true);
    } else {
      setpasswordConfirm(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <StyledHeading>SignUp</StyledHeading>
      {error.error ? <ErrorBox >{error.type}</ErrorBox> : ""}
      <StyledBox
        onClick={handleBoxClick}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        sx={{
          alignSelf: "center",
          width: "8%",
          height: "17vh",
          overflow: "hidden",
          color: "white",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ) : (
          <>
            <StyledIcon />
            <Typography component="div">Upload</Typography>
          </>
        )}
      </StyledBox>
      <StyledFormControl component="form" onSubmit={handleSubmit}>
        <StyledTextField label="Name" name="name" margin="dense" required />
        <StyledTextField
          label="E-mail"
          name="email"
          type="email"
          margin="dense"
          required
        />
        <StyledTextField
          label="Password"
          name="password"
          margin="dense"
          onChange={onChangePassword}
          error={!passwordConfirm}
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
        <StyledTextField
          label="Confirm Password"
          name="confirmPassword"
          margin="dense"
          style={{ color: "white" }}
          onChange={onChangePassword}
          error={!passwordConfirm}
          type={showPassword ? "text" : "password"}
          InputProps={{
            // Customize InputProps to include endAdornment
            endAdornment: (
              <InputAdornment position="end" style={{ color: "white" }}>
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

export default SignUp;
