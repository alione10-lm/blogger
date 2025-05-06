import React from "react";
import FormRow from "../components/ui/FormRow";
import Button from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";

const ReplyForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const OnSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit(OnSubmit)}>
      <input
        className="input p-0.5"
        type="text"
        placeholder="reply to"
        {...register("text", {
          required: "reply must be at least 1 charatere",
        })}
      />
    </form>
  );
};

export default ReplyForm;
