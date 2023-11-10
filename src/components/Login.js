import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const nickNameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleLogin = () => {
    const nickName = nickNameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        nickName,
        password,
      })
      .then((response) => {
        const authorizationHeader = response.headers.authorization;
        if (authorizationHeader) {
          navigate("/assessment", {
            state: { nickName: nickName, token: authorizationHeader },
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        navigate(0);
      });
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
        Sign In
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Nickname"
        autoComplete="off"
        placeholder="Enter a unique nickname"
        inputRef={nickNameRef}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="off"
        inputRef={passwordRef}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <Link href="/signup">Don't have an account? Sign up</Link>
    </Container>
  );
}

export default Login;
