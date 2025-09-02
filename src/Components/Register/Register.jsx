import React from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { refine } from "./../../../node_modules/zod/v4/classic/schemas";
import { Link ,useNavigate } from "react-router-dom";

export default function Register() {
  let schema = z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "not less than 3 characters"),
    email: z.string().nonempty("email is required").email("Not Valid Email"),
    password: z
      .string()
      .regex(/^[A-Z][a-z0-9]{3,9}/, "password is not valid")
      .nonempty("Password is required"),
    rePassword: z
      .string()
      .regex(/^[A-Z][a-z0-9]{3,9}/, "Please confirm your password")
      .nonempty("Please confirm your password"),
    dateOfBirth: z.string().nonempty("date is required"),
    gender: z.enum(["male", "female"]),
  });
  refine((data) => data.password == data.rePassword, {
    message: "password does not match",
    path: ["rePassword"],
  });

  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  async function onSubmit(values) {
    console.log(values);
    try {
      let { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      if (data.message == "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError("root", { message: error.response.data.error });
    }
  }
  return (
    <>
      <div className="w-1/2 mx-auto shadow-lg my-5 py-3 px-2 relative max-sm:w-[80%]">
        <h1 className="text-blue-800 text-2xl my-5 font-bold ">Register Now</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            type="text"
            placeholder="Type Your Name"
            className="input input-neutral w-full focus:outline-0 border-slate-400 my-2 rounded-lg"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <input
            {...register("email")}
            type="email"
            placeholder="Type Your Email"
            className="input input-neutral w-full focus:outline-0 border-slate-400 my-2 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Type Your Password"
            className="input input-neutral w-full focus:outline-0 border-slate-400 my-2 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <input
            {...register("rePassword")}
            type="Password"
            placeholder="Confirm Password"
            className="input input-neutral w-full focus:outline-0 border-slate-400 my-2 rounded-lg"
          />
          {errors.rePassword && (
            <p className="text-red-500">{errors.rePassword.message}</p>
          )}
          <input
            {...register("dateOfBirth")}
            type="date"
            placeholder="Select Date"
            className="input input-neutral w-full focus:outline-0 border-slate-400 my-2 rounded-lg"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
          <div className="my-3 max-sm:text-center">
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="male"
              value="male"
              className="radio radio-primary"
            />
            <label htmlFor="male" className="px-2 pe-10">
              Male
            </label>
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="female"
              value="female"
              className="radio radio-primary"
            />
            <label htmlFor="female" className="px-2">
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          <div className="mt-8 pb-4 text-blue-800 font-bold max-sm:mt-6">
            {" "}
            <span>
              already got an account ?{" "}
              <Link
                className="underline underline-offset-5 text-blue-600 hover:text-blue-400 transition duration-300 ease-in-out"
                to="/login"
              >
                log in now
              </Link>
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-2 rounded-xl cursor-pointer bg-blue-800  hover:bg-blue-700 transition duration-300 ease-in-out text-white my-3 absolute right-5 bottom-3 max-sm:static block max-sm:mx-auto max-sm:mt-5"
            >
              {isSubmitting ? "Loading... " : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
