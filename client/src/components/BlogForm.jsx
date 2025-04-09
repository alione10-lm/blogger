import React, { useState } from "react";
import FormRow from "./ui/FormRow";
import Button from "./ui/Button";
import Tiptap, { Result } from "./Tiptap";
import { useForm } from "react-hook-form";

const BlogForm = () => {
  const [description, setDescription] = useState("");

  const [descriptionError, setDescriptionError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const submitHandler = (data) => {
    if (!description) {
      setDescriptionError("description is required");
      return;
    }
    const newData = {
      data,
      description: description,
    };
    console.log(newData);
    reset();
  };

  return (
    <div className="w-full  flex  justify-center">
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

        <FormRow label="image/video" htmlFor="image-video">
          <div className="relative inline-flex items-center w-full dark:text-gray-300 gap-2 dark:dark:bg-gray-100/4    border-none outline-none bg-gray-50 text-sm border rounded border-slate-200 text-slate-500">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="peer order-2 w-full [&::file-selector-button]:hidden"
              {...register("file")}
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

        <Button type="submit">Publich</Button>
      </form>
    </div>
  );
};

export default BlogForm;
