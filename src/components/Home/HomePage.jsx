import React from "react";
import {
  FaMoneyBillWave,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaQuoteLeft
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-green-900 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl font-bold text-center">
            Track your expenses effortlessly
          </h1>
          <p className="mt-4 text-xl ">
            Manage your finances with modern solutions developed for you
          </p>
          <div className="flex space-x-8 mt-10">
            <div className="flex flex-col items-center">
              <FaMoneyBillWave className="text-4xl" />
              <p className="mt-2">Efficient tracking</p>
            </div>
            <div className="flex flex-col items-center">
              <FaFilter className="text-4xl" />
              <p className="mt-2">Transaction Filtering</p>
            </div>
            <div className="flex flex-col items-center">
              <IoIosStats className="text-4xl" />
              <p className="mt-2">Insightful Reports</p>
            </div>
          </div>
          <Link to={"/register"}>
            <button className="mt-8 px-6 py-3 bg-white text-lg text-green-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 hover:scale-105 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          How It Works
        </h2>
        <div className=" max-w-6xl mt-10 mx-auto flex items-center justify-between px-5 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-500 rounded-full text-white text-3xl mb-2">
              <FaSignInAlt />
            </div>
            <h3 className="font-semibold mb-2 text-xl">Sign Up</h3>
            <p>Register and start managing your expense in a minute.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-green-500 rounded-full text-white text-3xl mb-2">
              <FaList />
            </div>
            <h3 className="font-semibold mb-2 text-xl">Add Transactions</h3>
            <p>Quickly add income and expenses to your account.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-yellow-500 rounded-full text-white text-3xl mb-2">
              <FaChartPie />
            </div>
            <h3 className="font-semibold mb-2 text-xl">View Reports</h3>
            <p>See insightful reports and graphs of your finances.</p>
          </div>
        </div>
      </div>
      <div className="py-20 px-4 bg-gray-200">
        <h2 className="text-4xl font-bold text-gray-900 text-center">What Our Users Say</h2>
        <div className=" mt-10 max-w-6xl mx-auto flex items-center justify-between px-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaQuoteLeft className="text-lg text-gray-600"/>
            <p className="mt-2 text-lg">This app has revolutionised the way I track my expenses. Highly intuitive and user-friendly</p>
            <p className="text-lg font-bold mt-2">- Aditya Singh</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaQuoteLeft className="text-lg text-gray-600"/>
            <p className="mt-2 text-lg">"Finally, a hassle-free way to manage my finances. The insights
            feature is a game changer!"</p>
            <p className="text-lg font-bold mt-2">- Kanika Chaudhary</p>
          </div>
        </div>
      </div>
      <div className="bg-cyan-950 py-20 px-4 text-white">
        <div className=" max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Ready To Take Control Your Finances?</h2>
          <p className="mt-4">Join us now and start managing your expenses like a pro!</p>
          <Link to={'/register'} >
          <button className="mt-8 py-3 px-6 bg-white text-cyan-950 text-lg rounded-lg shadow-lg hover:bg-gray-200 hover:scale-105 transition duration-300">Sign Up For Free</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
