import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "./ui/Button";

const BlogsFilter = ({ close, closeModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm();

  const FormSubmit = (data) => {
    searchParams.set("filter", data.filter || "all");
    setSearchParams(searchParams);
    close?.();
    closeModal?.();
  };

  const handleClear = () => {
    setSearchParams("");
    close?.();
    closeModal?.();
  };

  return (
    <form
      onSubmit={handleSubmit(FormSubmit)}
      action=""
      className=" dark:bg-dark-bg-1 p-4 h-fit md:border border-gray-200 dark:border-gray-800 rounded-md  w-full md:block"
    >
      <div className="mb-10 w-full grid grid-cols-3 gap-x-4 md:grid-cols-2">
        {["sports", "football", "education", "trading", "programming"].map(
          (item, ndx) => (
            <div key={ndx} className="flex items-center gap-2 ">
              <input
                value={item}
                type="radio"
                defaultChecked={item === searchParams.get("filter")}
                {...register("filter")}
              />
              <label className="text-slate-700 dark:text-gray-300">
                {item}
              </label>
            </div>
          )
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button type="submit" size="small">
          apply filter
        </Button>
        <Button
          variant="ghost"
          size="small"
          onClick={handleClear}
          type="button"
        >
          remove filter
        </Button>
      </div>
    </form>
  );
};
export default BlogsFilter;
