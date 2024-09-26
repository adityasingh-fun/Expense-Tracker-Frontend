import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryServices";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoriesList = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });

  const { data, isError, isFetched, isLoading, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });
  const handleOnclick = (id) => {
    console.log("The id onclick", id);
    mutateAsync(id)
      .then((data) => {
        //! refetch
        refetch();
      })
      .catch((e) => console.log(e));
  };
  console.log("Data is", data);

  return (
    <div className="max-w-xl p-6 bg-white shadow-xl rounded-lg my-10 mx-auto">
      <h2 className="text-center mb-4 text-2xl font-semibold text-gray-800">
        Categories
      </h2>
      <ul className="space-y-4">
        {data?.map((category) => {
          return (
            <li
              key={category?._id}
              className="flex items-center justify-between bg-gray-100 py-3 px-4 rounded-md"
            >
              <div>
                <span className="text-gray-800">{category?.name}</span>
                <span
                  className={`ml-3 text-xs py-1 px-2 inline-flex leading-5 font-semibold rounded-full ${
                    category?.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {" "}
                  {category?.type?.charAt(0).toUpperCase() +
                    category?.type?.slice(1)}{" "}
                </span>
              </div>
              <div className="flex space-x-6 items-center">
                <Link to={`/update-category/${category._id}`}>
                  <button className="text-blue-500 text-xl hover:text-blue-700 hover:scale-105 ease-in-out transition-all duration-300 cursor-pointer">
                    <FaEdit />{" "}
                  </button>
                </Link>
                <button
                  onClick={() => handleOnclick(category?._id)}
                  className="text-red-600 text-xl hover:text-red-800 hover:scale-105 ease-in-out transition-all duration-300 cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
