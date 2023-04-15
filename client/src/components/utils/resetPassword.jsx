import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const token = useLocation().search;

  const [err, setError] = useState(null);

  const [suc, setSuc] = useState(null);

  const [state, setState] = useState(null);

  //   const [inputUS, setInputUS] = useState({
  //     email: "",
  //   });

  //   const [inputRS, setInputRS] = useState({
  //     password: "",
  //   });

  //   const handleChange = (e) => {
  //     setInputUS((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   };

  //   const handleChangeRS = (e) =>{
  //     setInputRS((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   }

  const [inputs, setInputRS] = useState({
    email: "",
    code: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputRS((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (inputs.email !== "") {
      try {
        const res = await axios.post("/auth/reset-password", inputs, {
          withCredentials: true,
        });
        setState(res.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response.data);
      }
    } else {
      setError("Please enter the email!");
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (inputs.email !== "") {
        if (inputs.code.length === 4) {
            if (inputs.password.length >= 5) {
                try {
                    const res = await axios.post(
                    `/auth/reset-password`,
                    inputs,
                    { withCredentials: true }
                    );
                    setSuc(res.data);
                } catch (error) {
                    console.log(error);
                    setError(error.response.data);
                }
            } else {
                setError("Password should be of 5 or more characters!");
            }
        } else {
            setError("Please enter the four digit reset code!");
        }
    } else {
      setError("Please enter the email!");
    }
  };

  return (
    <>
      {suc ? (
        <>
          <p class="text-xl text-center text-blue-700">{suc}</p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </>
      ) : (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
              Account Recovery
            </h1>
            {(err && <p className="text-xl text-center text-red-700">{err}</p>)
            ||
            (state && <p className="text-xl text-center text-green-700">Reset Code has been Sent. Please check your email.</p>)}
            <form className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {!state && (
                <div className="mt-6">
                  <button
                    onClick={handleUserSubmit}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  >
                    Find User
                  </button>
                </div>
              )}
            </form>

            {state && (
              <form className="mt-6">
                <div className="mb-2">
                  <label
                    htmlFor="code"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Reset Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleResetSubmit}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            )}

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Remembered your password?{" "}
              <Link
                to={"/login"}
                className="font-medium text-purple-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
