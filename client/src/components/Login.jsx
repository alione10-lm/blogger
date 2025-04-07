import { NavLink } from "react-router-dom";
import Button from "./ui/Button";
import FormRow from "./ui/FormRow";

export default function Login() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col  justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-500">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto  sm:w-full  sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <FormRow label="Email adress" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input"
              />
            </FormRow>

            <FormRow label="password">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="input"
              />
            </FormRow>

            <Button>Sign in</Button>
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
