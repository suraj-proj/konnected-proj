import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function BooksByLevel() {
  const [books,setBooks] = useState([])
  
  const location = useLocation();
  const navigate = useNavigate();

  const sl_name = location.pathname.split("/")[2];

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await axios.get(`/books/${sl_name}`);
        console.log("data" + res.data);
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sl_name]);

  return (
    <div>
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
  )
}

export default BooksByLevel