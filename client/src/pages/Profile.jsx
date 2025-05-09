import React from "react";
import FormRow from "../components/ui/FormRow";
import Button from "../components/ui/Button";
import { Calendar, FileText, Mail } from "lucide-react";
import BlogCard from "../components/BlogCard";
import Modal from "../components/ui/Modal";
import FullSpinner from "../components/ui/FullSpinner";
import { useOutletContext } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import dayjs from "dayjs";
import "dayjs/locale/fr";
import { updateUser } from "../utils/api";
import toast from "react-hot-toast";
import useCurrentUser from "../hooks/useCurrentUser";
import ProfileSkeleton from "../components/ui/ProfileSkeleton";
import { formatBirthDay } from "../services/helpers";
import EmptyBlogs from "../components/ui/EmptyBlogs";

const Profile = () => {
  const { user } = useOutletContext();

  const { isGettingCurrentUser } = useCurrentUser();

  console.log(user?.user?.blogs);

  return (
    <div className="w-full">
      <div className="border mb-10 rounded-lg p-4 border-gray-300 dark:border-gray-700 ">
        {isGettingCurrentUser ? (
          <ProfileSkeleton />
        ) : (
          <div className="w-full md:flex-row flex  flex-col md:gap-10">
            {user?.user?.avatar ? (
              <img
                src={`http://localhost:5000/uploads/${user?.user?.avatar}`}
                alt=""
                loading="lazy"
                className="rounded-lg md:w-[20rem] w-[10rem] "
              />
            ) : (
              <span className="relative uppercase md:w-[5rem]  md:h-[5rem]  size-[4rem] md:mb-4 inline-flex items-center justify-center  text-lg text-white rounded bg-indigo-500 ">
                {`${user?.user?.firstName[0]} ${user?.user?.lastName[0]}`}
              </span>
            )}
            <div className="mt-5">
              <h1 className="capitalize mb-4 dark:text-slate-300  text-gray-600 font-medium text-2xl md:text-4xl">
                {user?.user?.firstName} {user?.user?.lastName}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <p className=" text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2">
                  <Mail size={20} className="stroke-indigo-600" />
                  {user?.user?.email}
                </p>
                <div className="size-2 bg-indigo-500 rounded-full" />
                <p className=" text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2 ">
                  <Calendar size={20} className="stroke-indigo-500" />
                  {formatBirthDay(user?.user?.birthDate)}
                </p>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {user?.user?.bio}
              </p>
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
            </div>
          </div>
        )}
      </div>

      <div className="md:w-2/3 w-full">
        {user?.user?.blogs.length === 0 ? (
          <EmptyBlogs isCurrentUser />
        ) : (
          user?.user?.blogs?.map((blog) => (
            <BlogCard
              isCurrentUser
              media={blog.media}
              key={blog._id}
              likes={blog.likes}
              comments={blog.comments}
              createdBy={blog.createdBy}
              createdAt={blog.createdAt}
              id={blog._id}
              title={blog.title}
              description={blog.description}
            />
          ))
        )}
      </div>
    </div>
  );
};

const EditProfileForm = ({ user, closeModal }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries("current-user");
      toast.success("profile successfully updated");
      closeModal();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const submitHandler = (data) => {
    const formData = new FormData();

    data.avatar.length && formData.append("avatar", data.avatar[0]);
    formData.append("bio", data.bio);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("birthDate", data.birthDate);

    update(formData);
  };
  return (
    <form
      action=""
      className=""
      onSubmit={handleSubmit(submitHandler)}
      encType="multipart/form-data"
    >
      <FormRow label="avatar">
        <div className="relative inline-flex items-center w-full dark:text-gray-300 gap-2 dark:dark:bg-gray-100/4    border-none outline-none bg-gray-50 text-sm border rounded border-slate-200 text-slate-500">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            // defaultValue={user?.user?.avatar}
            className="peer order-2 w-full [&::file-selector-button]:hidden"
            {...register("avatar")}
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded cursor-pointer whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-indigo-300 peer-disabled:bg-indigo-300"
          >
            Upload
          </label>
        </div>
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
          defaultValue={user?.user?.email}
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
      <FormRow label="bio" htmlFor="bio">
        <textarea
          name="bio"
          defaultValue={user?.user?.bio}
          id="bio"
          className="input"
          {...register("bio")}
        ></textarea>
      </FormRow>
      <FormRow label="first name" htmlFor="firstName">
        <input
          defaultValue={user?.user?.firstName}
          type="text"
          id="firstName"
          className="input"
          {...register("firstName", {
            required: "first name is required",
          })}
        />
      </FormRow>
      <FormRow label="last name" htmlFor="lastName">
        <input
          type="text"
          defaultValue={user?.user?.lastName}
          id="lastName"
          className="input"
          {...register("lastName", {
            required: "first name is required",
          })}
        />
      </FormRow>
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
      <Button type="submit" onClick={update}>
        {isUpdating ? <FullSpinner /> : " save changes"}
      </Button>
      <div className="mt-2">
        <Button type="button" variant="ghost" onClick={() => closeModal()}>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default Profile;
