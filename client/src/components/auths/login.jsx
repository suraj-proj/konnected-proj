import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/authContext";

function Login() {
  const navigate = useNavigate();
  const {currentUser, login} = useContext(AuthContext);
  
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null);

  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  console.log(inputs);

  const handleSubmit = async e =>{
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <>
    {currentUser
    ?
    (<>{window.location.href= "/"}</>)
    :
    (<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        {err &&
            <p className="text-xl text-center text-red-700">{err}</p>}<form className="mt-6">
              <div className="mb-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                  Username
                </label>
                <input type="text" name="username" onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input type="password" name="password" onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
              <Link to="/auth/reset-password" className="text-xs text-purple-600 hover:underline">
                Forget Password?
              </Link>
              <div className="mt-6">
                <button onClick={handleSubmit}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Login
                </button>
              </div>
            </form><p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-medium text-purple-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
      </div>
    </div>)
    }
    </>
  );
}

export default Login;
