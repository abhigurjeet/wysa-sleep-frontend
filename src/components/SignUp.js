import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
  const nickNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (confirmPasswordRef.current.value === passwordRef.current.value) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}`, {
          nickName: nickNameRef.current.value,
          password: passwordRef.current.value,
        });
        await axios
          .post(`${process.env.REACT_APP_API_URL}/login`, {
            nickName: nickNameRef.current.value,
            password: passwordRef.current.value,
          })
          .then((response) => {
            const authorizationHeader = response.headers.authorization;
            if (authorizationHeader) {
              navigate("/assessment", {
                state: {
                  nickName: nickNameRef.current.value,
                  token: authorizationHeader,
                },
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error.message);
            navigate(0);
          });
      } catch (error) {
        console.error("Error:", error.message);
        navigate(0);
      }
    } else {
      alert("passwords not matching");
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "40vh",
        margin: "4% auto", // Set the height to full viewport height
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://play-lh.googleusercontent.com/_2t27Nwv0sJgq3XsUCP-haxf0C17xzIEVtO4Pfrp_cSJG-VJAWzIC0DAlVF2kEx8ol2M"
      />

      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Nickname"
        placeholder="Enter a unique nickname"
        inputRef={nickNameRef}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        inputRef={passwordRef}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Confirm Password"
        type="password"
        inputRef={confirmPasswordRef}
      />
      <Button onClick={handleSubmit} variant="contained">
        Sign Up
      </Button>
      <Link href="/">Already have an account? Sign in</Link>
    </Container>
  );
}

export default SignUp;
