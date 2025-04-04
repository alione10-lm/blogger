import React from "react";
import FormRow from "./ui/FormRow";
import Button from "./ui/Button";

const BlogForm = () => {
  return (
    <div className="w-full h-[100vh] p-6 flex  justify-center">
      <form>
        <FormRow label="title">
          <input type="text" id="title" className="input" />
        </FormRow>
        <FormRow label="description">
          <textarea name="" className="input" id="description"></textarea>
          {/* <input type="text" className="input" id="description" /> */}
        </FormRow>
        <FormRow label="image/video" htmlFor="image-video">
          <div class="relative inline-flex items-center w-full gap-2  border-none outline-none bg-gray-50 text-sm border rounded border-slate-200 text-slate-500">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="peer order-2 [&::file-selector-button]:hidden"
            />
            <label
              for="file-upload"
              class="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded cursor-pointer whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-indigo-300 peer-disabled:bg-indigo-300"
            >
              Upload
            </label>
          </div>
        </FormRow>
        <Button type="submit">Publich</Button>
      </form>
    </div>
  );
};

export default BlogForm;
