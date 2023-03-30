import React, { useContext, MouseEvent, ReactElement } from "react";
import "./Register.css";
import CustomButton from "../../components/CustomButton";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AccountContext } from "../../State/AccountContext";
import { Box, TextField, Button, Stack } from "@mui/material";
import { REGISTRATION } from "../../apollo-client/mutations";
const Register = (): ReactElement => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    name,
    setName,
    verifyPassword,
    setVerifyPassword,
    setFocusedInput,
  } = useContext(AccountContext);

  const [register, { data }] = useMutation(REGISTRATION);

  const handleRegistration = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const { data } = await register({
      variables: {
        email: email,
        password: password,
        firstName: name.firstName,
        lastName: name.lastName,
      },
    });
    if (data && data.registration) {
      window.location.href = "/";
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "gainsboro", width: "100vw", height: "100vh" }}
    >
      <Stack
        justifyContent="space-around"
        sx={{
          boxShadow: "0px 0px 17px 1px #1d1f26",
          backgroundColor: "#fff",
          padding: "24px",
          width: "350px",
          margin: " 5% auto",
          borderRadius: "6px",
          height: "100%",
          maxHeight: "450px",
        }}
      >
        <TextField
          id="outlined-input-0"
          label="Email"
          value={email}
          type="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <TextField
          id="outlined-input-1"
          label="First Name:"
          value={name.firstName}
          type="text"
          variant="outlined"
          onChange={(e) => setName({ ...name, firstName: e.target.value })}
          required
        />
        <TextField
          id="outlined-input-2"
          label="Last Name:"
          type="text"
          variant="outlined"
          value={name.lastName}
          onChange={(e) => setName({ ...name, lastName: e.target.value })}
          required
        />
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            id="outlined-input-2"
            label="Password"
            type={passwordVisible ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          <Button
            style={{ position: "absolute", bottom: 15, fontSize: 11, right: 0 }}
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
          >
            {passwordVisible ? "Hide" : "Show"}
          </Button>
        </Box>
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            id="outlined-input-3"
            label="Confirm Password"
            type={passwordVisible ? "text" : "password"}
            variant="outlined"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            fullWidth
            required
          />

          <Button
            variant="text"
            style={{ position: "absolute", bottom: 15, fontSize: 11, right: 0 }}
            onClick={() => {
              setFocusedInput("form-input-verify");
              setPasswordVisible(!passwordVisible);
            }}
          >
            {passwordVisible ? "Hide" : "Show"}
          </Button>
        </Box>
        <CustomButton
          onClick={(e) => {
            if (password === verifyPassword) {
              handleRegistration(e);
            }
          }}
        />
      </Stack>
    </Stack>
  );
};

export default withRouter(Register);
