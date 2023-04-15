import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/authContext";
import axios from "axios";

function CreateFields() {
  const [openTab, setOpenTab] = React.useState(1);
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);

  // Initialize Inputs of the Form Inputs
  const [bookInputs, setBookInputs] = useState({
    bname: "",
    bdescription: "",
    blevel: "",
    bauthor: "",
  })

  // Set error from response
  const [err, setError] = useState(null);

  const [suc, setSuc] = useState(null);

  // Handle Changes in the form inputs
  const handleChange = e =>{
    setBookInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  console.log(bookInputs);

  const addBook = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/books/add-book",bookInputs,{withCredentials:true});
      setSuc(res.data)
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-blue-600"
                    : "text-blue-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Add Book
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-blue-600"
                    : "text-blue-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Add Topic
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-blue-600"
                    : "text-blue-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Add Notes
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {err && <span className="text-red-700">{err}</span>}
                {suc && <span className="text-blue-700">{suc}</span>}
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {/* Add Book */}
                  <div>
                    <label
                      for="book_name"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Book Title
                    </label>
                    <input type="text" id="book_name" name="bname"
                      placeholder="Title of the book" onChange={handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label for="book_desc"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Book Description
                    </label>
                    <input type="text" id="book_desc" name="bdescription"
                      placeholder="Short description of the book"  onChange={handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label for="levels"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Recommended for
                    </label>
                    <select id="levels" name="blevel" onChange={handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose a level</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                    </select>
                  </div>
                  <div>
                    <label for="book_author"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Author
                    </label>
                    <input type="text" id="book_author" name="bauthor"
                      placeholder="Author of the book" onChange={handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <button
            type="button"
            onClick={addBook}
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            Add Book
          </button>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {/* Add Topic */}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  {/* Add Notes */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateFields;
