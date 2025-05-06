import React, { useState } from "react";
import FormRow from "./ui/FormRow";
import Button from "./ui/Button";
import Tiptap, { Result } from "./Tiptap";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FullSpinner from "../components/ui/FullSpinner";
import { createBlog } from "../utils/api";

import { toast } from "react-hot-toast";
import axios from "axios";
const BlogForm = ({ closeModal }) => {
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const { mutate: createBlogFn, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("blog successfully published ");
      closeModal();
      queryClient.invalidateQueries("blogs");
    },
    onError: () => {
      toast.error("failed");
    },
  });
  // const { mutate, isPending } = useMutation({
  //   mutationFn: (formData) =>
  //     axios.post("/api/blogs", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("blogs");
  //     closeModal();
  //     reset();
  //     toast.success("published !");
  //   },
  //   onError: () => {
  //     toast.error("blog publishion failed ");
  //   },
  // });

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", description);
    formData.append("media", data.media[0]);

    // mutate(formData);
    createBlogFn(formData);
  };

  return (
    <div className="w-full  flex  justify-center" encType="multipart/form-data">
      <form className="" onSubmit={handleSubmit(submitHandler)}>
        <FormRow label="title" error={errors?.title?.message}>
          <input
            type="text"
            id="title"
            className="input"
            {...register("title", {
              required: "title is required",
            })}
          />
        </FormRow>

        <FormRow label="image/video" htmlFor="media">
          <div className="relative inline-flex items-center w-full dark:text-gray-300 gap-2 dark:dark:bg-gray-100/4    border-none outline-none bg-gray-50 text-sm border rounded border-slate-200 text-slate-500">
            <input
              id="media"
              name="media"
              type="file"
              className="peer order-2 w-full [&::file-selector-button]:hidden"
              {...register("media")}
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded cursor-pointer whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-indigo-300 peer-disabled:bg-indigo-300"
            >
              Upload
            </label>
          </div>
        </FormRow>
        <FormRow label="description" error={descriptionError}>
          <Tiptap register={register} setDescription={setDescription}>
            <Result setDescription={setDescription} />
          </Tiptap>
        </FormRow>

        <Button type="submit">
          {isPending ? <FullSpinner size={"small"} /> : "publish"}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
