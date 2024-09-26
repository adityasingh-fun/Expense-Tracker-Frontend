import React, { useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { useNavigate } from "react-router-dom";

//! Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be atleast 5 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError, isPending, isSuccess, error } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });
  // console.log(mutation);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Values of registeration submit", values);
      mutateAsync(values)
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    },
  });
  useEffect(()=>{
    setTimeout(()=>{
      if(isSuccess){
        navigate('/login')
      }
    },1000)
  },[isSuccess,isPending,isError,error])
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white max-w-lg p-6 mx-auto border border-gray-200 my-20 rounded-xl space-y-6 shadow-lg"
    >
      <h2 className="text-3xl font-semibold text-gray-800 text-center">
        Sign Up
      </h2>
      {isPending && <AlertMessage type="loading" message="Loading..." />}
      {isSuccess && <AlertMessage type="success" message="Registered successfully"/>}
      {isError && <AlertMessage type="error" message={error.response.data.message} />}
      <p className="text-sm text-gray-500 text-center">
        Join our community now!
      </p>
      <div className="relative ">
        <FaUser className="absolute left-3 top-4 text-gray-500 text-lg" />
        <input
          type="text"
          id="username"
          {...formik.getFieldProps("username")}
          placeholder="Username"
          className="border pl-11 py-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="text-xs text-red-500">
            {" "}
            {formik.errors.username}{" "}
          </span>
        )}
      </div>
      <div className="relative ">
        <FaEnvelope className="absolute left-3 top-4 text-gray-500 text-lg" />
        <input
          type="email"
          id="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="border pl-11 py-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500"> {formik.errors.email} </span>
        )}
      </div>
      <div className="relative ">
        <FaLock className="absolute left-3 top-4 text-gray-500 text-lg" />
        <input
          type="password"
          id="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="border pl-11 py-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">
            {" "}
            {formik.errors.password}{" "}
          </span>
        )}
      </div>
      <div className="relative ">
        <FaLock className="absolute left-3 top-4 text-gray-500 text-lg" />
        <input
          type="password"
          id="confirmPassword"
          {...formik.getFieldProps("confirmPassword")}
          placeholder="Confirm Password"
          className="border pl-11 py-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {" "}
            {formik.errors.confirmPassword}{" "}
          </span>
        )}
      </div>
      <button
        className="border w-full py-2 px-6 bg-gradient-to-r from-blue-500 to-teal-500 text-lg font-bold text-white rounded-lg hover:from-blue-600 hover:to-teal-600 hover:scale-105 transition-all duration-300 ease-in-out"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
