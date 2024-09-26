import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaWallet,
  FaRupeeSign,
  FaCommentDots,
  FaCalendarAlt,
} from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { listCategoriesAPI } from "../../services/category/categoryServices";
import { addTransactionAPI } from "../../services/Transactions/TransactionServices";
import AlertMessage from "../Alert/AlertMessage";

//! Validations
const validationSchema = Yup.object({
  type: Yup.string().oneOf(["expense","income"]).required("Transaction type is required"),
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
  category: Yup.string().required("category is required"),
  date:Yup.date().required("Date is required"),
  description: Yup.string( )
})

const AddTransaction = () => {

  const {data} = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ['list-categories']
  })
  console.log("Data fetched",data)

  const {mutateAsync,isError,isPending,isSuccess,error} = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ["add-transaction"]
  })

  const formik = useFormik({
    initialValues:{
      type:"",
      amount:"",
      category:"",
      date:"",
      description:"",
    },
    validationSchema,
    onSubmit: (values)=>{
      console.log(values)
      mutateAsync(values).then((data) => {
        console.log(data)
      }).catch(e => console.log(e))
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-2xl px-8 py-10 my-10 bg-white mx-auto rounded-lg shadow-xl space-y-6">
      <div className="text-center">
        <h2 className=" font-semibold text-2xl text-gray-800">
          Transaction Details
        </h2>
        <h2 className=" text-gray-600 ">Fill in the details below</h2>
        
      </div>
      {isError && <AlertMessage type="error" message={error?.response?.data?.message}/> }
      {isPending && <AlertMessage type="loading" message="Adding transaction" />}
      {isSuccess && <AlertMessage type="success" message="Transaction added successfully"/>}
      <div className="space-y-2">
        <label htmlFor="type" className="flex items-center gap-3 font-medium">
          <FaWallet className="text-blue-500 text-xl" />
          <span>Type</span>
        </label>
        <select
        {...formik.getFieldProps("type")}
          id="type"
          className="border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md w-full"
        >
          <option value="">Select Transaction Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <span className="text-xs text-red-500"> {formik.errors.type} </span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="amount" className="flex items-center gap-2 font-medium">
          <FaRupeeSign className="text-blue-500 text-xl" />
          <span>Amount</span>
        </label>
        <input
          type="number"
          placeholder="Amount"
          {...formik.getFieldProps("amount")}
          id="amount"
          className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.amount && formik.errors.amount && (
          <span className="text-xs text-red-500"> {formik.errors.amount} </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="flex items-center gap-2 font-medium"
        >
          <FaCommentDots className="text-xl text-blue-500" />
          <span>Category</span>
        </label>
        <select
        {...formik.getFieldProps("category")}
          id="category"
          className="p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select Category</option>
          {
            data?.map((category)=>{
              return <option key={category?._id} value={category?.name}> {category?.name} </option>
            })
          }
        </select>
        {formik.touched.category && formik.errors.category && (
          <span className="text-xs text-red-500"> {formik.errors.category} </span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="flex items-center gap-2 font-medium">
          <FaCalendarAlt className="text-xl text-blue-500" />
          <span>Date</span>
        </label>
        <input
          type="date"
          id="date"
          {...formik.getFieldProps("date")}
          className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.date && formik.errors.date && (
          <span className="text-xs text-red-500"> {formik.errors.date} </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="flex items-center gap-2 font-medium"
        >
          <FaCommentDots className="text-xl text-blue-500" />
          <span>Description (Optional)</span>
        </label>
        <textarea
          id="description"
          {...formik.getFieldProps("description")}
          placeholder="Description"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>

      </div>
      <button type="submit" className="text-white bg-blue-500 px-3 py-2 rounded-md hover:text-gray-200 hover:scale-105 transition-all ease-in-out duration-300">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
