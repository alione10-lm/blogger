import { NavLink, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import FormRow from "./ui/FormRow";
import { useForm } from "react-hook-form";

import FullSpinner from "./ui/FullSpinner";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoginIn, LoginFn } = useAuth();

  const submitHandler = (data) => {
    LoginFn(data);
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col  justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-500">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto  sm:w-full  sm:max-w-sm">
          <form
            onSubmit={handleSubmit(submitHandler)}
            method="POST"
            className="space-y-6"
          >
            <FormRow
              label="Email adress"
              htmlFor="email"
              error={errors?.email?.message}
            >
              <input
                id="email"
                name="email"
                type="email"
                defaultValue="john@doe2.com"
                required
                autoComplete="email"
                className="input"
                {...register("email", {
                  required: "email is required",
                  papattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
            </FormRow>

            <FormRow label="password" error={errors?.password?.message}>
              <input
                id="password"
                name="password"
                type="password"
                defaultValue="JohnDoe10@"
                required
                autoComplete="current-password"
                className="input"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      " include uppercase, lowercase, number, and special character",
                  },
                })}
              />
            </FormRow>

            <Button type="submit">
              {isLoginIn && <FullSpinner size={"small"} />}
              login
            </Button>
          </form>

          <p className="mt-10 dark:text-gray-300 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <NavLink
              to="../register"
              className="hover:underline text-indigo-500 underline-offset-2"
            >
              register now &rarr;
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
