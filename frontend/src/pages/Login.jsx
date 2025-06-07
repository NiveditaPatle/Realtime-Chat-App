import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/userSlice";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("result", result);
      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      navigate("/");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setErr(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-primary rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            Welcome to <span className="text-white">ChatterPop</span>
          </h1>
        </div>

        <form
          className="w-full flex flex-col gap-[20px] items-center"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="email"
            className="w-[90%] h-[50px] outline-none border-2 border-primary px-[20px] py-[10px] bg-white rounded-lg shadow-gray-300 shadow-md text-gray-700 text-[19px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="w-[90%] h-[50px] border-2 border-primary overflow-hidden rounded-lg shadow-gray-300 shadow-md relative">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="password"
              className="w-full h-full outline-none px-[20px] py-[10px] bg-white text-gray-700 text-[19px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-[12px] right-[20px] text-sm text-primary font-semibold cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >{`${show ? "hide" : "show"}`}</span>
          </div>

          {err && <p className="text-red-500">*{err}</p>}

          <button className="px-[20px] py-[10px] bg-primary rounded-2xl shadow-gray-400 shadow-md text-[20px] w-[200px] mt-[20px] font-bold text-gray-800 hover:shadow-inner">
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-gray-700 cursor-pointer">
            Want to create a new account ?{" "}
            <Link className="text-primary font-semibold underline" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
