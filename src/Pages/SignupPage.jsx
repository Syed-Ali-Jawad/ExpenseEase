import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import signupImage from "../assets/signup-image.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPswd, setConfirmPswd] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const [emailValidationError, setEmailValidationError] = useState();
  const [passwordValidationError, setPasswordValidationError] = useState();
  const [passwordConfirmationError, setPasswordConfirmationError] = useState();
  const navigate = useNavigate();

  function emailValidation(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      setEmailValidationError(null);
      setEmail(email);
    } else {
      setEmailValidationError(
        <Typography variant="body2" sx={{ color: "red" }}>
          Enter valid email
        </Typography>
      );
      return;
    }
  }
  function passwordValidation(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password)) {
      setPasswordValidationError(null);
      setPassword(password);
    } else {
      setPasswordValidationError(
        <Typography variant="body2" sx={{ color: "red" }}>
          Password shall contain atleast one uppercase letter, one lowercase,
          one number and one special character and shall be at least 8
          characters long.
        </Typography>
      );
      return;
    }
  }
  function submitHandler() {
    localStorage.setItem(
      `${email}`,
      JSON.stringify({
        username: username,
        email: email,
        password: password,
      })
    );
    localStorage.setItem(`${email} IncomeAccounts`, JSON.stringify(["Cash"]));
    navigate("/ExpenseEase/");
  }
  function passwordConfirmation(confirmPassword) {
    setConfirmPswd(confirmPassword);
    confirmPassword !== password
      ? setPasswordConfirmationError(
          <Typography variant="body2" sx={{ color: "red" }}>
            Both password don't match
          </Typography>
        )
      : setPasswordConfirmationError(null);
  }
  return (
    <div className="w-screen h-screen sm:grid grid-cols-2">
      <div className="h-screen w-full sm:flex flex-col justify-center shadow-blue-900 shadow-2xl hidden">
        <img style={{ width: "90%", height: "60%" }} src={signupImage} />
        <Typography
          sx={{ color: "blue", fontWeight: "bold", margin: "0 auto" }}
          variant="h5"
        >
          Join Expense Manager Today
        </Typography>
        <Typography
          sx={{ textAlign: "center", padding: "0 2%", color: "gray" }}
          variant="p"
        >
          Ready to take control of your finances? Sign up for Expense Manager
          now and start managing your expenses with ease. Our platform offers
          powerful tools to help you track spending, set budgets, and reach your
          financial goals. Create your account today and take the first step
          towards financial success.
        </Typography>
      </div>
      <div className="flex flex-col items-center bg-purple-500 h-full">
        <Box
          component="form"
          className="shadow-2xl z-10 bg-white shadow-blue-900 w-5/6 sm:w-4/6"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            padding: "5% 10%",
            borderRadius: "20px",
            margin: "auto",
            "& .MuiTextField-root": { my: 1, mx: "auto", width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography className="text-blue-500" variant="h5">
            Signup
          </Typography>
          <TextField
            onChange={(e) => setUserName(e.target.value.trim())}
            required
            fullWidth
            label="Username"
          />
          <TextField
            onChange={(e) => emailValidation(e.target.value.trim())}
            sx={{ margin: "0 auto" }}
            required
            fullWidth
            label="Email"
          />
          {emailValidationError || null}
          <TextField
            onChange={(e) => passwordValidation(e.target.value.trim())}
            required
            type={showPassword ? "text" : "password"}
            fullWidth
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      showPassword === true
                        ? setShowPassword(false)
                        : setShowPassword(true)
                    }
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordValidationError || null}
          <TextField
            onChange={(e) => passwordConfirmation(e.target.value.trim())}
            required
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            label="Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      showConfirmPassword === true
                        ? setShowConfirmPassword(false)
                        : setShowConfirmPassword(true)
                    }
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordConfirmationError || null}
          <Button
            disabled={
              username &&
              email &&
              password &&
              confirmPswd &&
              password === confirmPswd
                ? false
                : true
            }
            onClick={submitHandler}
            sx={{ borderRadius: "40px", width: "40%" }}
            variant="contained"
          >
            Signup
          </Button>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-500" to="/ExpenseEase/">
              Login
            </Link>{" "}
          </p>
        </Box>
      </div>
    </div>
  );
}
