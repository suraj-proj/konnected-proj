import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/authContext";

function Books() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  const tag = useLocation().search;
  console.log(tag);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/books${tag}`);
        console.log("data" + res.data.id);
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [tag]);

  return (
    <div>
      {currentUser && (
        <>
          <button
            type="button"
            onClick={() => navigate("/create-fields")}
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            Add Book
          </button>
        </>
      )}
      <ul className="max-w-md divide-y divide-gray-200">
        {books.map((book) => (
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <Link to={`/book/${book.s_name}/${book.bid}`}>
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {book.bname}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {book.description}
                  </p>
                </div>
              </Link>
              <Link to={`/books/${book.sl_name}`}>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {book.lname}
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
