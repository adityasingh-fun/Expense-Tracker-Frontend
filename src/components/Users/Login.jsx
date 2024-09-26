import React, { useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";


//! Validations
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password should be minimum 5 characters long")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });
  const formik = useFormik({
    //! Initial Values
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      mutateAsync(values)
        .then((data) => {
          //! dispatch action
          dispatch(loginAction(data))
          //! save the user into local storage
          localStorage.setItem('userInfo',JSON.stringify(data));  
        } )
        .catch((e) => console.log(e));
    },
  });
  useEffect(()=>{
    setTimeout(()=>{
      if(isSuccess){
        navigate('/dashboard')
      }
    },1000)
  },[isPending,isSuccess,error,isError])
  console.log({isPending, isError, isSuccess, error })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white max-w-lg p-6 mx-auto border border-gray-200 my-20 rounded-xl space-y-6 shadow-lg"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Dispaly message */}
      {isPending && <AlertMessage type="loading" message="Logging you in.." />}
      {isError && <AlertMessage type="error" message={error?.response?.data?.message} />}
      {isSuccess && <AlertMessage type="success" message="Login Success" />}
      <p className="text-sm text-center text-gray-500">
        Login to access your account
      </p>
      <div className="relative ">
        <FaEnvelope className="absolute left-3 top-4 text-gray-400 text-lg" />
        <input
          type="email"
          id="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="border border-gray-300 pl-12 pr-10 py-3 w-full rounded-md focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500"> {formik.errors.email} </span>
        )}
      </div>
      <div className="relative ">
        <FaLock className="absolute left-3 top-4 text-gray-400 text-lg" />
        <input
          type="password"
          id="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="border border-gray-300 pl-12 pr-10 py-3 w-full rounded-md focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">
            {" "}
            {formik.errors.password}{" "}
          </span>
        )}
      </div>
      <button
        type="submit"
        className=" bg-gradient-to-r from-blue-500 to-teal-500 w-full hover:from-blue-600 hover:to-teal-600 hover:scale-105 transition-all duration-300 ease-in-out py-2 px-6 rounded-md text-white text-lg font-bold "
      >
        Login
      </button>
    </form>
  );
};

export default Login;
