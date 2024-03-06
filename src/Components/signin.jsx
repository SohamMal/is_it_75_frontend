import { useNavigate } from "react-router-dom";
import logo from "../images/isit75.png";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spin } from "antd";

export function Signin() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeButton, setActiveButton] = useState("signin"); 
  const [isLoading, setIsLoading] = useState(false);

  // const handleSignIn = async () => {
  //   const responseBody = {
  //     username,
  //     password,
  //   };
  //   try {
  //     const response = await fetch("https://is-it-75.onrender.com/signin", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(responseBody),
  //     });
  //     const value = await response.json();
  //     if (value) {
  //       setResponseMsg(value.msg);
  //       if (value.token) {
  //         localStorage.setItem("token", value.token);
  //         navigate("/home");
  //       }
  //     }
  //   } catch (e) {
  //     setResponseMsg("Server Error");
  //   }
  // };

  const handleSignIn = async () => {
    if (!username) {
      return toast.error("Please enter username", { id: 1 });
    }
    if (!password) {
      return toast.error("Please enter password", { id: 2 });
    }
    const responseBody = {
      username,
      password,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://is-it-75.onrender.com/signin",
        responseBody
      );

      if (response?.data) {
        toast.success("Signin Success", { id: 5 });
        if (response?.data?.token) {
          localStorage.setItem("token", response?.data?.token);
          navigate("/");
        }
      }
    } catch (e) {
      toast.error("Something went wrong, please try again", { id: 7 });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSignUp = async () => {
  //   const responseBody = {
  //     username,
  //     password,
  //   };
  //   try {
  //     const response = await fetch("https://is-it-75.onrender.com/signup", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(responseBody),
  //     });
  //     const value = await response.json();
  //     if (value) {
  //       setResponseMsg(value.msg);
  //       if (value.token) {
  //         localStorage.setItem("token", value.token);
  //         navigate("/home");
  //       }
  //     }
  //   } catch (e) {
  //     setResponseMsg("Server Error");
  //   }
  // };

  const handleSignUp = async () => {
    if (!username) {
      return toast.error("Please enter username", { id: 3 });
    }
    if (!password) {
      return toast.error("Please enter password", { id: 4 });
    }
    const responseBody = {
      username,
      password,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://is-it-75.onrender.com/signup",
        responseBody
      );
      if (response?.data) {
        if (response?.data?.token) {
          localStorage.setItem("token", response?.data?.token);
          toast.success("Signup Success", { id: 6 });
          navigate("/");
        }
      }
    } catch (e) {
      toast.error("Something went wrong, please try again", { id: 8 });
    } finally {
      setIsLoading(false);
    }
  };
  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleForm = (isSignIn) => {
    setIsSignIn(isSignIn);
    setActiveButton(isSignIn ? "signin" : "signup");
  };

  return (
    <div className="outer-container">
      {isLoading ? (
        <div className="h-full w-full justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          <div className="options-container">
            <button
              className={activeButton === "signin" ? "active" : ""}
              onClick={() => toggleForm(true)}
            >
              Sign In
            </button>
            <button
              className={activeButton === "signup" ? "active" : ""}
              onClick={() => toggleForm(false)}
            >
              Sign Up
            </button>
          </div>
          <div className="form-container">
            {isSignIn ? (
              <div>
                <h3>Sign In</h3>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleEmailChange}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={handlePasswordChange}
                />
                <button type="submit" onClick={handleSignIn}>
                  Sign in
                </button>
              </div>
            ) : (
              <div>
                <h3>Sign Up</h3>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  onClick={() => {
                    handleSignUp();
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
