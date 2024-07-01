import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import loginImage from "../assets/login image.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsExpenseClicked, setUserDetail } from "../Store";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function loginHandler() {
    if (localStorage.getItem(`${email}`)) {
      const userdata = JSON.parse(localStorage.getItem(`${email}`));
      if (email && password && userdata.password === password) {
        setLoginError(null);
        localStorage.setItem("Logged in ID", JSON.stringify(userdata));
        dispatch(setUserDetail(userdata));
        navigate("/ExpenseEase/home");
      } else {
        setLoginError(<p>Wrong Credentials</p>);
      }
    } else {
      setLoginError(<p>Wrong Credentials</p>);
    }
  }
  return (
    <div className="w-screen h-screen sm:grid grid-cols-2">
      <div className="flex flex-col items-center bg-blue-300 h-full">
        <Box
          component="form"
          className=" shadow-blue-900 shadow-2xl bg-white w-5/6 sm:w-4/6"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            height: "50%",

            padding: "5% 10%",
            borderRadius: "20px",
            margin: "auto",
            "& .MuiTextField-root": { my: 1, mx: "auto", width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography className="text-blue-500" variant="h5">
            Login
          </Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value.trim())}
            sx={{ margin: "0 auto" }}
            required
            fullWidth
            label="Email"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value.trim())}
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
          {loginError || null}
          <Button
            onClick={loginHandler}
            sx={{ borderRadius: "40px", width: "30%" }}
            variant="contained"
          >
            Login
          </Button>
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-500" to="/ExpenseEase/signup">
              SignUp
            </Link>{" "}
          </p>
        </Box>
      </div>
      <div className="h-screen w-full shadow-2xl sm:flex flex-col justify-center shadow-blue-900  hidden">
        <img src={loginImage} />
        <Typography
          sx={{ fontWeight: "bold", margin: "0 auto" }}
          className="text-blue-500"
          variant="h5"
        >
          Welcome Buddy
        </Typography>
        <Typography
          sx={{ textAlign: "center", padding: "0 2%", color: "gray" }}
          variant="p"
        >
          Take control of your finances with Expense Manager. Our intuitive
          platform helps you track your expenses, set budgets, and achieve your
          financial goals effortlessly. Sign in to your account or create a new
          one to get started on your journey to financial freedom.
        </Typography>
      </div>
    </div>
  );
}
