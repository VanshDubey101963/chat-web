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
import {registerUser} from "../../api/userApi"

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
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

          {showSignup && <SignUp />}

          {!showSignup && <SignIn />}
        </Stack>
      </div>

      {!showSignup && (
        <Stack direction={"row"} gap={1}>
          <p>Don't have an account?</p>
          <p
            onClick={() => setShowSignup(true)}
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            Sign up
          </p>
        </Stack>
      )}

      {showSignup && (
        <Stack direction={"row"} gap={1}>
          <p>Already have an account?</p>
          <p
            onClick={() => setShowSignup(false)}
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
  );
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const isRegistered = registerUser(data);
  };

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      {errors.username?.type == "required" && (
        <span style={{ color: "red", fontSize: 12 }}>
          {" "}
          Username is required{" "}
        </span>
      )}

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
      {errors.email?.type == "required" && (
        <span style={{ color: "red", fontSize: 12 }}> Email is required </span>
      )}

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
          type={showPassword ? "text" : "password"} // Toggle between text and password
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
      {errors.password?.type == "required" && (
        <span style={{ color: "red", fontSize: 12 }}>Password is required</span>
      )}
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff", // Blue color for background
          color: "white", // White text color
          border: "none", // No border
          padding: "12px 20px", // Padding for height and width
          borderRadius: "5px", // Rounded corners
          fontSize: "16px", // Font size
          cursor: "pointer", // Pointer cursor on hover
          transition: "background-color 0.3s", // Smooth transition for background color on hover
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

  const onSubmit = (data) => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      {errors.username?.type == "required" && (
        <span style={{ color: "red", fontSize: 12 }}>
          {" "}
          Username is required{" "}
        </span>
      )}

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
          type={showPassword ? "text" : "password"} // Toggle between text and password
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
      {errors.password?.type == "required" && (
        <span style={{ color: "red", fontSize: 12 }}>Password is required</span>
      )}
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff", // Blue color for background
          color: "white", // White text color
          border: "none", // No border
          padding: "12px 20px", // Padding for height and width
          borderRadius: "5px", // Rounded corners
          fontSize: "16px", // Font size
          cursor: "pointer", // Pointer cursor on hover
          transition: "background-color 0.3s", // Smooth transition for background color on hover
        }}
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;
