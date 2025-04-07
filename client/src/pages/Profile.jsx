import React, { useState } from "react";
import FormRow from "../components/ui/FormRow";
import Button from "../components/ui/Button";
import { Bookmark, Pen } from "lucide-react";
import BlogCard from "../components/BlogCard";
import { NavLink, Outlet } from "react-router-dom";
import Select from "../components/ui/Select";

const Profile = () => {
  const [isEditSession, setIsEditSession] = useState(false);

  return (
    <>
      <h1 className="capitalize dark:text-slate-300  text-gray-600 font-medium text-xl md:text-2xl">
        your personal area
      </h1>

      <img src="/avatar.jpg" alt="" className="rounded-full" />
      <Button size="small" onClick={() => setIsEditSession((is) => !is)}>
        {isEditSession ? "cancel" : "Edit profile "}
      </Button>
      {isEditSession && (
        <form action="" className="w-full md:w-1/3">
          <FormRow label="avatar">
            <div className="relative inline-flex items-center w-full dark:text-gray-300 gap-2 dark:dark:bg-gray-100/4    border-none outline-none bg-gray-50 text-sm border rounded border-slate-200 text-slate-500">
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="peer order-2 w-full [&::file-selector-button]:hidden "
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded cursor-pointer whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-indigo-300 peer-disabled:bg-indigo-300"
              >
                Upload
              </label>
            </div>
          </FormRow>
          <FormRow label="bio" htmlFor="bio">
            <textarea
              name="bio"
              defaultValue="something !!!"
              id="bio"
              className="input"
            ></textarea>
          </FormRow>
          <FormRow label="username" htmlFor="username">
            <input
              defaultValue="john doe"
              type="text"
              id="username"
              className="input"
            />
          </FormRow>
          <FormRow label="email" htmlFor="email">
            <input
              type="text"
              defaultValue="john@gmail.com"
              id="email"
              className="input"
            />
          </FormRow>
          <Button type="submit">save changes</Button>
          <Button type="button" variant="ghost">
            discard changes
          </Button>
        </form>
      )}
      {/* <Select
        options={[
          { text: "my posts", value: "my posts" },
          { text: "saved posts", value: "saved" },
          { text: "liked posts", value: "liked" },
        ]}
      /> */}
      <div className="w-full md:w-2/3">
        {Array.from({ length: 10 }).map((_, ndx) => (
          <BlogCard isCurrentUser key={ndx} />
        ))}
      </div>
    </>
  );
};

export default Profile;
