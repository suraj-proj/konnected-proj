import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Book() {
  const [book, setBook] = useState({});
  const [topics, setTopics] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const book_id = location.pathname.split("/")[3];
  const s_name = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/book/${s_name}/${book_id}`);
        console.log(res.data);
        setBook(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [s_name, book_id]);
  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20">
      <div
        className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
        style={{ fontFamily: "Georgia,serif" }}
      >
        {/*Title*/}
        <div className="font-sans">
          <p className="text-base md:text-sm text-green-500 font-bold">
            &lt;{" "}
            <span onClick={()=>{navigate(-1)}} style={{cursor:"pointer"}}
              className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
            >
              BACK TO PREV
            </span>
          </p>
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            {book.bname}
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">
            Book for: {book.sl_name}
          </p>
        </div>
        {/*Post Content*/}
        {/*Lead Para*/}
        <p className="py-6">
          {book.description}
        </p>

        {/* Yaha topics ko list banaune */}
        <h1 className="py-2 font-sans">Topic 1</h1>
        <h2 className="py-2 font-sans">Topic 2</h2>
        <h3 className="py-2 font-sans">Topic 3</h3>
        <h4 className="py-2 font-sans">Topic 4</h4>
        <h5 className="py-2 font-sans">Topic 5</h5>
        <h6 className="py-2 font-sans">Topic 6</h6>
      </div>
    </div>
  );
}

export default Book;
