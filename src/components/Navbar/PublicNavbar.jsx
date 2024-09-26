import React from "react";
import { SiAuthy } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-white h-28 shadow-md  flex items-center justify-between px-7 py-11">
      <div className="flex px-10 items-center justify-between  w-[320px]">
        <Link to={"/"}>
          <SiAuthy className="text-green-600 text-6xl" />
        </Link>
        <h1 className="font-semibold text-3xl">MyTracker</h1>
      </div>
      <div className="flex px-10  items-center justify-between  gap-4">
        <Link to={"/register"}>
          <button className="bg-pink-600 flex items-center px-6 py-3 gap-3 text-white text-xl rounded-lg">
            <FaRegUser />
            Register
          </button>
        </Link>
        <Link to={"/login"}>
          <button className="bg-green-600 flex items-center px-6 py-3 gap-3 text-white text-xl rounded-lg animate-bounce">
            <RiLoginCircleLine />
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
