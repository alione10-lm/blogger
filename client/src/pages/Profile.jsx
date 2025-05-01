import React, { useState } from "react";
import FormRow from "../components/ui/FormRow";
import Button from "../components/ui/Button";
import { Bookmark, FileText, Pen, PenIcon } from "lucide-react";
import BlogCard from "../components/BlogCard";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import Select from "../components/ui/Select";
import ProfileTabs from "../components/ui/ProfileTabs";

import FullSpinner from "../components/ui/FullSpinner";
import Modal from "../components/ui/Modal";

const Profile = () => {
  // const [isEditSession, setIsEditSession] = useState(false);
  const { user } = useOutletContext();
  console.log(user);

  return (
    <div className="w-full">
      <div className="">
        <h1 className="capitalize dark:text-slate-300  text-gray-600 font-medium text-xl md:text-2xl">
          your personal area , {user?.user?.firstName} {user?.user?.lastName}
        </h1>

        <img src="/avatar.jpg" alt="" className="rounded-full mb-4" />
        {/* <Button size="small" onClick={() => setIsEditSession((is) => !is)}>
          {isEditSession ? "cancel" : "Edit profile "}
        </Button> */}
        <Modal>
          <Modal.Open>
            <Button variant="primary" size="small">
              edit profile
            </Button>
          </Modal.Open>
          <Modal.Window>
            <EditProfileForm user={user} />
          </Modal.Window>
        </Modal>
        {/* {isEditSession && (
          <form action="" className="w-full">
            <FormRow label="avatar">
              <div className="relative inline-flex items-center w-full dark:text-gray-300 gap-2 dark:dark:bg-gray-100/4    border-none outline-none bg-gray-50 text-sm border rounded border-slate-200 text-slate-500">
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  defaultValue={user?.user?.avatar}
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
                defaultValue={user?.user?.bio}
                id="bio"
                className="input"
              ></textarea>
            </FormRow>
            <FormRow label="firstName" htmlFor="firstName">
              <input
                defaultValue={user?.user?.firstName}
                type="text"
                id="firstName"
                className="input"
              />
            </FormRow>
            <FormRow label="lastName" htmlFor="lastName">
              <input
                type="text"
                defaultValue={user?.user?.lastName}
                id="lastName"
                className="input"
              />
            </FormRow>
            <Button type="submit">save changes</Button>
            <Button type="button" variant="ghost">
              discard changes
            </Button>
          </form>
        )} */}
      </div>
      {/* <Select
        options={[
          { text: "my posts", value: "my posts" },
          { text: "saved posts", value: "saved" },
          { text: "liked posts", value: "liked" },
        ]}
      /> */}

      <div className="md:w-2/3 w-full">
        {/* <ProfileTabs /> */}
        {user?.userBlogs?.length === 0 ? (
          <EmptyBlogs />
        ) : (
          Array.from({ length: 10 }).map((_, ndx) => (
            <BlogCard isCurrentUser key={ndx} />
          ))
        )}
      </div>
    </div>
  );
};

const EditProfileForm = ({ user, closeModal }) => {
  return (
    <form action="" className="">
      <FormRow label="avatar">
        <div className="relative inline-flex items-center w-full dark:text-gray-300 gap-2 dark:dark:bg-gray-100/4    border-none outline-none bg-gray-50 text-sm border rounded border-slate-200 text-slate-500">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            defaultValue={user?.user?.avatar}
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
          defaultValue={user?.user?.bio}
          id="bio"
          className="input"
        ></textarea>
      </FormRow>
      <FormRow label="firstName" htmlFor="firstName">
        <input
          defaultValue={user?.user?.firstName}
          type="text"
          id="firstName"
          className="input"
        />
      </FormRow>
      <FormRow label="lastName" htmlFor="lastName">
        <input
          type="text"
          defaultValue={user?.user?.lastName}
          id="lastName"
          className="input"
        />
      </FormRow>
      <Button type="submit">save changes</Button>
      <div className="mt-2">
        <Button type="button" variant="ghost" onClick={() => closeModal()}>
          cancel
        </Button>
      </div>
    </form>
  );
};

const EmptyBlogs = () => {
  return (
    <div className="text-center py-10">
      <FileText className="mx-auto h-12 w-12 text-indigo-300" />
      <h3 className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        No blogs yet
      </h3>
      <p className="mt-1 text-sm text-gray-400">
        You haven’t written any blogs yet. Start creating one!
      </p>
    </div>
  );
};
export default Profile;
