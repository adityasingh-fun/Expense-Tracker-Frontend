import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { listTransactionsAPI } from "../../services/Transactions/TransactionServices";
import { FaTrash, FaEdit } from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryServices";

const TransactionList = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const {name,value} = e.target;
    setFilters((prev) => ({...prev,[name]:value}))
  };
  console.log(filters)

  const { data: categories } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });
  console.log("Categories are as", categories);
  const { data: Transactions } = useQuery({
    queryFn: ()=> listTransactionsAPI(filters),
    queryKey: ["list-transactions",filters],
  });
  //   console.log(Transactions);
  return (
    <div className="p-4 bg-white w-[97%] my-5 mx-auto rounded-lg shadow-lg ">
      <div className="flex items-center justify-between py-10 px-5">
        <div>
          <label htmlFor="startDate">Start Date: </label>
          <input
            value={filters.startDate}
            onChange={handleFilterChange}
            name="startDate"
            type="date"
            id="startDate"
            className="border border-gray-300 py-1 px-3 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date: </label>
          <input
            value={filters.endDate}
            onChange={handleFilterChange}
            name="endDate"
            type="date"
            id="endDate"
            className="border border-gray-300 py-1 px-3 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <select
          value={filters.type}
          onChange={handleFilterChange}
          name="type"
          id="type"
          className="border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select Transaction Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={handleFilterChange}
          name="category"
          id="category"
          className="border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="All">All Categories</option>
          <option value="Uncategorized">Uncategorized</option>
          {categories?.map((category) => {
            return <option value={category?.name}> {category?.name}</option>;
          })}
        </select>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg shadow-lg ">
        <h1 className="text-2xl text-gray-800 font-medium mb-5">
          Filtered Transactions
        </h1>
        <ul className="space-y-3">
          {Transactions?.map((transaction) => {
            return (
              <li
                key={transaction?._id}
                className="border border-gray-300 py-3 px-3 bg-white rounded-md"
              >
                {" "}
                {
                  <div className="flex items-center justify-between ">
                    <div>
                      <span className="font-medium">
                        {new Date(transaction?.date).toLocaleDateString()}{" "}
                      </span>
                      <span
                        className={`ml-2 px-2 text-sm py-1 rounded-full ${
                          transaction?.type === "income"
                            ? "text-green-800 bg-green-200"
                            : "text-red-800 bg-red-200"
                        }`}
                      >
                        {" "}
                        {transaction?.type}{" "}
                      </span>
                      <span className="ml-6 text-gray-700 font-semibold">
                        {" "}
                        ₹{transaction?.amount.toLocaleString()}
                      </span>
                      <span className="ml-2 text-gray-600  text-sm italic">
                        {" "}
                        {transaction?.description}{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-blue-600 text-xl">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 text-xl">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                }{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
