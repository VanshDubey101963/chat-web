import { Stack } from "@mui/material";
import {
  Envelope,
  User,
  UserCircle,
  Eye,
  EyeSlash,
  Lock,
} from "phosphor-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { isUser, loginUser, registerUser } from "../api/userApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../utils/redux/slices/page/pageSlice";
import { toastError, toastInfo, toastSuccess } from "../utils/toasts/toast";
import { fetchCurrentUserID } from "../utils/redux/slices/user/userSlice";

const Login = () => {
  const page = useSelector((state) => state.page.currPage);
  const dispatch = useDispatch();

  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#E2E8F0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <ToastContainer />

        <div
          style={{
            backgroundColor: "#FDFDFE",
            height: "40%",
            width: "30%",
            borderRadius: 5,
          }}
        >
          <Stack
            direction={"column"}
            alignItems={"center"}
            sx={{ width: "100%", height: "100%", padding: 2 }}
          >
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <UserCircle size={50} color="blue" />
              <h1>Welcome</h1>
            </Stack>

            {page == "signup" && <SignUp />}

            {page == "signin" && <SignIn />}
          </Stack>
        </div>

        {page == "signin" && (
          <Stack direction={"row"} gap={1}>
            <p>Don't have an account?</p>
            <p
              onClick={() => dispatch(setPage("signup"))}
              style={{
                color: "blue",
                cursor: "pointer",
              }}
            >
              Sign up
            </p>
          </Stack>
        )}

        {page == "signup" && (
          <Stack direction={"row"} gap={1}>
            <p>Already have an account?</p>
            <p
              onClick={() => dispatch(setPage("signin"))}
              style={{
                color: "blue",
                cursor: "pointer",
              }}
            >
              Sign in
            </p>
          </Stack>
        )}
      </div>
    </>
  );
};

const SignUp = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const Registered = await registerUser(data);

    if (Registered.ok) {
      toastSuccess(Registered.message);
      dispatch(setPage("signin"));
    } else {
      toastError(Registered.message);
    }
  };

  const onError = (errors) => {
    if (errors.password?.type == "required")
      toastInfo("Please enter your password to continue");

    if (errors.email?.type == "required")
      toastInfo("Please enter your email to continue");

    if (errors.username?.type == "required")
      toastInfo("Please enter your username to continue");
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        gap: 8,
      }}
    >
      <div style={{ position: "relative" }}>
        <User
          size={25}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "#aaa",
          }}
        />
        <input
          placeholder="Username"
          {...register("username", { required: true })}
          style={{
            width: 300,
            paddingLeft: 35,
            padding: "10px 10px 10px 40px",
            border: "1px solid #ddd",
            borderRadius: 5,
          }}
        />
      </div>

      <div style={{ position: "relative" }}>
        <Envelope
          size={25}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "#aaa",
          }}
        />
        <input
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
          style={{
            width: 300,
            paddingLeft: 35,
            padding: "10px 10px 10px 40px",
            border: "1px solid #ddd",
            borderRadius: 5,
          }}
        />
      </div>

      <div style={{ position: "relative" }}>
        <Lock
          size={25}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "#aaa",
          }}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", { required: true })}
          style={{
            width: 280,
            paddingLeft: 35,
            paddingRight: 25,
            padding: "10px 30px 10px 40px",
            border: "1px solid #ddd",
            borderRadius: 5,
          }}
        />
        <div
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          {showPassword ? (
            <EyeSlash size={20} color="#aaa" />
          ) : (
            <Eye size={20} color="#aaa" />
          )}
        </div>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        Sign up
      </button>
    </form>
  );
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const res = await loginUser(data);

    if (res) {
      const data = await isUser();

      if (data.ok) {
        dispatch(setPage("chat"));
        dispatch(fetchCurrentUserID(data.userID))
      } else {
        toastError("Try Login Again");
      }
    } else {
      toastError("Invalid Email or Password!");
    }
  };

  const onError = (errors) => {
    if (errors.password?.type == "required")
      toastInfo("Please enter your password to continue");

    if (errors.username?.type == "required")
      toastInfo("Please enter your username to continue");
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        gap: 8,
      }}
    >
      <div style={{ position: "relative" }}>
        <User
          size={25}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "#aaa",
          }}
        />
        <input
          placeholder="Username"
          {...register("username", { required: true })}
          style={{
            width: 300,
            paddingLeft: 35,
            padding: "10px 10px 10px 40px",
            border: "1px solid #ddd",
            borderRadius: 5,
          }}
        />
      </div>

      <div style={{ position: "relative" }}>
        <Lock
          size={25}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "#aaa",
          }}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", { required: true })}
          style={{
            width: 280,
            paddingLeft: 35,
            paddingRight: 25,
            padding: "10px 30px 10px 40px",
            border: "1px solid #ddd",
            borderRadius: 5,
          }}
        />
        <div
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          {showPassword ? (
            <EyeSlash size={20} color="#aaa" />
          ) : (
            <Eye size={20} color="#aaa" />
          )}
        </div>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;
