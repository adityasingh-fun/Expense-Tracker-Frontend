import React from "react";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addCategoryAPI } from "../../services/category/categoryServices";
import AlertMessage from "../Alert/AlertMessage";

//! Validations
const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .oneOf(["income", "expense"])
    .required("Category type is required"),
});

const AddCategory = () => {
  const { isError, isSuccess, isPending, error, mutateAsync } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["addCategory"],
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-2xl space-y-6 py-6 px-10 my-20 mx-auto rounded-lg shadow-xl"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Add Category</h2>
        <p className="text-gray-600">Fill in the details below</p>
      </div>
      {isError && (
        <AlertMessage type="error" message={error?.response?.data?.message} />
      )}
      {isSuccess && <AlertMessage type="success" message="Category added successfully"/>}
      <div className="space-y-3">
        <label
          htmlFor="type"
          className="flex gap-3 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500 text-xl" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          className="w-full border p-2 border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          id="type"
        >
          <option value="">Select Transaction Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <span className="text-red-500 text-xs"> {formik.errors.type} </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-gray-700 font-medium">
          <SiDatabricks className="inline mr-2 text-xl text-blue-500" /> Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          {...formik.getFieldProps("name")}
          className="border border-gray-300 mt-1 py-2 px-3 rounded-md shadow-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.name && formik.errors.name && (
          <span className="text-xs text-red-500"> {formik.errors.name} </span>
        )}
      </div>
      <button
        type="submit"
        className="py-2 px-4 text-white rounded-md font-medium hover:scale-105 hover:text-gray-200 ease-in-out duration-300 bg-blue-500"
      >
        Add Category
      </button>
    </form>
  );
};

export default AddCategory;
