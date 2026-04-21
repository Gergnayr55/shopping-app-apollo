import { useContext, ReactElement, MouseEvent, ChangeEvent } from "react";
import "./Login.css";
import { useMutation } from "@apollo/client";
import { saveUser } from "../../utils";
import CustomButton from "../../components/CustomButton";
import { AccountContext } from "../../State/AccountContext";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { USER_LOGIN } from "../../apollo-client/mutations";

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
            onFocus: () => setFocusedInput("email"),
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required={true}
          fullWidth
        />
        <CustomInput
          label="Password"
          type={passwordVisible ? "text" : "password"}
          value={password}
          customInputProps={{
            onBlur: () => setFocusedInput(""),
            onFocus: () => setFocusedInput("password"),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="text"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  sx={{ fontSize: 11, minWidth: "auto" }}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </Button>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          fullWidth
        />
        {data && data.login === null && (
          <Typography variant="body2" sx={{ color: "red" }}>
            Incorrect credentials entered. Please try again.
          </Typography>
        )}
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

export default Login;
