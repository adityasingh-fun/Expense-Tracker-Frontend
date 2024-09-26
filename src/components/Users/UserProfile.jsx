import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import UpdatePassword from "./UpdatePassword";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  profileAPI,
  updateProfileAPI,
} from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  const { data: profile, refetch } = useQuery({
    queryFn: profileAPI,
    queryKey: ["profile"],
  });
  console.log("Profile",profile)
  const { mutateAsync, isPending, isError, isSuccess,error } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update-profile"],
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutateAsync(values)
        .then((data) => {
          console.log(data);
          refetch();
        })
        .catch((e) => console.log(e));
    },
  });
  return (
    <>
      <div className="max-w-2xl bg-white p-8 my-10 mx-auto rounded-lg shadow-xl">
        <div className="text-center ">
          <h1 className="text-3xl font-medium">
            Welcome, {profile?.username}{" "}
          </h1>
          <span className="text-sm text-gray-500 ">{profile?.email}</span>
        </div>
        <div className="my-4">
          {isError && <AlertMessage type="error" message={error?.response?.data?.message}/>}
          {isSuccess && <AlertMessage type="success" message="Profile updated successfully" />}
          </div>
        <div className="mt-5">
          <h1 className="text-xl text-gray-700 font-semibold mb-8">
            Update Profile
          </h1>
          
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-blue-500 text-2xl" />
                <label
                  htmlFor="username"
                  className="text-lg font-medium text-gray-700"
                >
                  Username
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter username here"
                {...formik.getFieldProps("username")}
                id="username"
                className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500 text-2xl" />
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-gray-700"
                >
                  Email
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter email here"
                {...formik.getFieldProps("email")}
                id="email"
                className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 hover:scale-105 hover:text-gray-100 transition-all ease-in-out duration-300"
              type="submit"
            >
              Update Details
            </button>
          </form>
        </div>
      </div>
      <UpdatePassword />
    </>
  );
};

export default UserProfile;
