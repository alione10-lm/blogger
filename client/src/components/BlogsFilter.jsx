import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "./ui/Button";

const BlogsFilter = ({ close }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm();

  const FormSubmit = (data) => {
    searchParams.set("filter", data.filter);
    setSearchParams(searchParams);
    close?.();
  };

  const handleClear = () => {
    setSearchParams("");
    close?.();
  };

  return (
    <form
      onSubmit={handleSubmit(FormSubmit)}
      action=""
      className=" dark:bg-dark-bg-1 p-3 h-fit w-2/3 rounded-lg md:block"
    >
      <div className="mb-5 w-full grid grid-cols-2">
        {["sports", "football", "education", "trading", "programming"].map(
          (item, ndx) => (
            <div key={ndx} className="flex items-center gap-2 ">
              <input value={item} type="radio" {...register("filter")} />
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
