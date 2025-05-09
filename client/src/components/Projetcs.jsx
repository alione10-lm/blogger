// import { useInfiniteQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { React } from "react";

// import { useInView } from "react-intersection-observer";

// const fetchItems = async ({ pageParam = 1 }) => {
//   const res = await fetch(`http://localhost:5000/scroll?page=${pageParam}`);
//   return res.json();
// };

// function Projects() {
//   const {
//     data,
//     fetchNextPage,
//     isFetching,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ["items"],
//     queryFn: fetchItems,
//     getNextPageParam: (lastPage, pages) => {
//       // Determine the next page number, or return undefined to stop
//       return lastPage.hasMore ? pages.length + 1 : undefined;
//     },
//   });

//   if (isFetching) return <p>loading</p>;

//   const blogs = data?.pages.flatMap((page) => page.blogs);
//   console.log(blogs);

//   return (
//     <div style={{ height: "200px", overflowY: "auto" }}>
//       {blogs?.map((blog) => (
//         <div className="border border-slate-500 mt-5" key={blog._id}>
//           {blog.description}
//         </div>
//       ))}
//       <button
//         className="disabled:cursor-not-allowed"
//         disabled={!hasNextPage}
//         onClick={() => fetchNextPage()}
//       >
//         more
//       </button>
//       {isFetchingNextPage && <p>Loading more...</p>}
//     </div>
//   );
// }

// export default Projects;
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Projetcs() {
  const fetchItems = async ({ pageParam = 1 }) => {
    const res = await fetch(`http://localhost:5000/scroll?page=${pageParam}`);
    return res.json();
  };
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchItems,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <div className="flex flex-col gap-2 h-[10rem] overflow-y-auto">
      {data?.pages
        .flatMap((page) => page.blogs)
        .map((blog) => (
          <div className="rounded-md bg-white/5 p-4" key={blog._id}>
            {blog.description}
          </div>
        ))}

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
}
