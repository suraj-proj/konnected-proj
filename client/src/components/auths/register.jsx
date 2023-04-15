import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/authContext";

function Login() {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);

  // Initialize Inputs of the Form Inputs
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  // Set error from response
  const [err, setError] = useState(null);

  // Handle Changes in the form inputs
  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  // Call on Submit for server req
  const handleSubmit = async e =>{
    e.preventDefault();
    try {
      await axios.post("auth/register",inputs,{withCredentials:true});
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <>{currentUser
      ?
      (<>{window.location.href= "/"}</>)
      :
    (<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Register an Account
        </h1>
        {err &&
        <p class="text-xl text-center text-red-700">{err}</p>}
        <form className="mt-6">
        <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
              Full Name
            </label>
            <input type="text" name="name" onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input type="text" name="username" onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input type="email" name="email" onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input type="password" name="password" onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account? {" "}
          <Link
            to={"/login"}
            className="font-medium text-purple-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>)
  }</>
  );
}

export default Login;
