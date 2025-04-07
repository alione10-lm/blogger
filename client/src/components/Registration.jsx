import { NavLink } from "react-router-dom";
import Button from "./ui/Button";
import FormRow from "./ui/FormRow";

export default function Registration() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10  text-center text-2xl/9 font-bold tracking-tight text-indigo-500">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div className="w-full flex gap-4">
              <FormRow label="First name">
                <input
                  id="First name"
                  name="First name"
                  type="texxt"
                  required
                  autoComplete="email"
                  className="input"
                />
              </FormRow>
              <FormRow label="Last name">
                <input
                  id="Last name"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="input"
                />
              </FormRow>
            </div>
            <FormRow label="Birth date">
              <input
                id="Birth date"
                type="date"
                name="id-date07"
                className="input"
              />
            </FormRow>
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

            <Button>register</Button>
          </form>

          <p className="mt-10 text-center dark:text-gray-300 text-sm/6 text-gray-500">
            Already a mermber?{" "}
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
