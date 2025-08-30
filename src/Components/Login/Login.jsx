import React, { useContext } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { refine } from "./../../../node_modules/zod/v4/classic/schemas";
import { TokenContext } from "../../Context/TokenContext";
import { Link ,useNavigate } from "react-router-dom";

export default function Login() {
  let { token, setToken } = useContext(TokenContext);
  let schema = z.object({
    email: z.string().nonempty("email is required").email("Not Valid Email"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(/^[A-Z][a-z0-9]{3,9}/, "password is not valid"),
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
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      if (data.message == "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError("root", { message: error.response.data.error });
    }
  }
  return (
    <>
      <div className="w-1/2 mx-auto shadow-lg my-5 py-3 px-2 max-sm:w-[80%] relative">
        <h1 className="text-blue-800 text-2xl my-5 font-bold "> login Now</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            placeholder="Type Your Email..."
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
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}

          <div className="mt-8 pb-4 text-blue-800 font-bold max-sm:mt-6">
            {" "}
            <span>
              dont have an account ?{" "}
              <Link
                className="underline underline-offset-5 text-blue-600 hover:text-blue-400 transition duration-300 ease-in-out"
                to="/register"
              >
                Register Now
              </Link>
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-2 rounded-xl cursor-pointer bg-blue-800  hover:bg-blue-700 transition duration-300 ease-in-out text-white my-3 absolute right-5 bottom-3 max-sm:static max-sm:ms-24 max-sm:mt-5"
            >
              {isSubmitting ? "Loading... " : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
