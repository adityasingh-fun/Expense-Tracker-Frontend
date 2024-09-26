import React from "react";
import { FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";

//! validations
const validationSchema = Yup.object({
  newPassword: Yup.string().min(5,"Password must be atleast 5 characters long").required("Password is required"),
});

const UpdatePassword = () => {
    const {mutateAsync,isError,isSuccess,error} = useMutation({
        mutationFn:changePasswordAPI,
        mutationKey:['change-password']
    })

    const formik = useFormik({
        initialValues:{
            newPassword:"",
        },
        validationSchema,
        onSubmit: (values)=>{
            console.log(values)
            mutateAsync(values).then((data) =>{
                console.log(data)
            }).catch(e => console.log(e))
        }
    })
  return (
    <div className="p-8 my-10 bg-white shadow-2xl max-w-2xl mx-auto rounded-md space-y-6">
      <h1 className="text-2xl font-medium text-center text-gray-700 mb-6">
        Change Password
      </h1>
      <div>
        {isError && <AlertMessage type="error" message={error?.response?.data?.message} />}
        {isSuccess && <AlertMessage type="success" message="Password changed successfully" />}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="ml-3">
          <label
            htmlFor="newPassword"
            className="text-lg font-semibold text-gray-700 "
          >
            New Password
          </label>
        </div>
        <div className="relative mt-2">
          <FaLock className="absolute top-3 left-5 text-blue-500" />
          <input
            type="password"
            placeholder="Enter new password"
            {...formik.getFieldProps("newPassword")}
            id="newPassword"
            className="border border-gray-300 ml-2 pl-10 py-2 rounded-md w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <span className="text-xs text-red-500 ml-3">  *{formik.errors.newPassword} </span>
          )}
        </div>
        <button
          type="submit"
          className=" ml-3 mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 hover:scale-105 hover:text-gray-100 transition-all ease-in-out duration-300"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
