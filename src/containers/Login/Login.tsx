import React, { useContext, ReactElement, MouseEvent } from "react";
import "./Login.css";
import { useMutation } from "@apollo/client";
import { saveUser } from "../../utils";
import CustomButton from "../../components/CustomButton";
import { AccountContext } from "../../State/AccountContext";
import { withRouter, Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import { USER_LOGIN } from "../../apollo-client/mutations";

// TODO: Convert to TS
function Login(): ReactElement {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    setFocusedInput,
  } = useContext(AccountContext);

  const [checkCreds, { data }] = useMutation(USER_LOGIN);

  const submitLogin = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const { data } = await checkCreds({
      variables: { email: email, password: password },
    });
    if (data && data.login) {
      saveUser(data.login);

      window.location.href = "/home";
    }
  };

  return (
    <div className="centered-form">
      <div className="centered-form-box">
        <CustomInput
          label="Email"
          type="text"
          value={email}
          customInputProps={{
            onBlur: () => setFocusedInput(""),
            onFocus: setFocusedInput("email"),
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required={true}
        />
        <br />
        <CustomInput
          label="Password"
          type={passwordVisible ? "text" : "password"}
          value={password}
          customInputProps={{
            onBlur: () => setFocusedInput(""),
            onFocus: setFocusedInput("password"),
          }}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
          }}
        >
          {data && data.login === null && (
            <Typography variant="body2" color="red" style={{ padding: 5 }}>
              Incorrect credentials entered. Please try again.
            </Typography>
          )}
        </Box>
        <div style={{ position: "relative" }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{ position: "absolute", fontSize: 11, right: 0, bottom: 60 }}
          >
            {passwordVisible ? "Hide" : "Show"}
          </Button>
        </div>
        <CustomButton onClick={submitLogin} />

        <p>
          <Link className="register-link" to="/register">
            Don't have an account? Create one.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(Login);
