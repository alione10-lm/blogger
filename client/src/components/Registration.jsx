import { data, NavLink } from "react-router-dom";
import Button from "./ui/Button";
import FormRow from "./ui/FormRow";
import { useForm } from "react-hook-form";

export default function Registration() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex min-h-full  flex-col justify-center px-6 md:py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5  text-center text-2xl/9 font-bold tracking-tight text-indigo-500">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(submitHandler)}
            method="POST"
            className="space-y-6"
          >
            <div className="w-full flex gap-4">
              <FormRow label="First name" error={errors?.firstName?.message}>
                <input
                  id="First name"
                  name="First name"
                  type="texxt"
                  required
                  defaultValue="Oussama"
                  autoComplete="email"
                  className="input"
                  {...register("firstName", {
                    required: "first name is required",
                  })}
                />
              </FormRow>
              <FormRow label="Last name" error={errors?.lastName?.message}>
                <input
                  id="Last name"
                  name="last name"
                  type="text"
                  required
                  defaultValue="Ali1"
                  autoComplete="email"
                  className="input"
                  {...register("lastName", {
                    required: "last name is required",
                  })}
                />
              </FormRow>
            </div>
            <FormRow label="Birth date" error={errors?.birthDate?.message}>
              <input
                id="Birth date"
                type="date"
                defaultValue="2000-10-10"
                name="id-date07"
                className="input"
                {...register("birthDate", {
                  required: "birth date is required",
                  validate: (value) => {
                    if (new Date(value).getTime() > Date.now())
                      return "invalid date ";
                  },
                })}
              />
            </FormRow>
            <FormRow
              label="Email adress"
              htmlFor="email"
              error={errors?.email?.message}
            >
              <input
                id="email"
                name="email"
                type="email"
                defaultValue="test@test.com"
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
                defaultValue="Test1234@"
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
            <FormRow
              label="confirm password"
              error={errors?.confirmPassword?.message}
              htmlFor="confirm-password"
            >
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                defaultValue="Test1234@"
                required
                autoComplete="current-password"
                className="input"
                {...register("confirmPassword", {
                  required: "this field is required",
                  validate: (value) => {
                    if (value.trim() !== getValues().password)
                      return "password do not match";
                  },
                })}
              />
            </FormRow>

            <Button type="submit">register</Button>
          </form>

          <p className="mt-10 text-center dark:text-gray-300 text-sm/6 text-gray-500">
            Already a member?{" "}
            <NavLink
              to="../login"
              className="hover:underline text-indigo-500 underline-offset-2"
            >
              sign in now &rarr;
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
