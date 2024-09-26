import React from "react";
import { SiAuthy } from "react-icons/si";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { logoutAction } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const PrivateNavbar = () => {
  //! dispatch
  const dispatch = useDispatch();
  const logoutHandler = () => {
    //! dispatch logout action
    dispatch(logoutAction());
    //! Remove the user from local storage
    localStorage.removeItem("userInfo"); 
  };
  return (
    <nav className="bg-white h-28 shadow-md  flex items-center justify-between px-7 py-11">
      <div className="flex px-10 items-center justify-between  w-[320px]">
        <Link to={"/"}>
          <SiAuthy className="text-green-600 text-6xl" />
        </Link>
        <h1 className="font-semibold text-3xl">MyTracker</h1>
      </div>
      <div className="flex items-center space-x-5 ">
        <Link
          to={"/add-transaction"}
          className="p-2 rounded-md text-base font-medium border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Add Transaction
        </Link>
        <Link
          to={"/add-category"}
          className="p-2 rounded-md text-base font-medium border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Add Category
        </Link>
        <Link
          to={"/categories"}
          className="p-2 rounded-md text-base font-medium border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Categories
        </Link>
        <Link
          to={"/profile"}
          className="p-2 rounded-md text-base font-medium border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Profile
        </Link>
        <Link
          to={"/dashboard"}
          className="p-2 rounded-md text-base font-medium border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Dashboard
        </Link>
      </div>

      <div className=" px-10  ">
        <button
          onClick={logoutHandler}
          className="bg-red-600 flex items-center px-6 py-3 gap-3 text-white text-xl rounded-lg hover:text-gray-200 hover:scale-105 transition-all ease-in-out duration-300"
        >
          <IoLogOutOutline />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
