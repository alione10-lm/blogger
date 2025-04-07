import React from "react";
import FormRow from "./ui/FormRow";
import { Send } from "lucide-react";
import Button from "./ui/Button";

const Comments = () => {
  return (
    <div>
      <ul>
        {Array.from({ length: 4 }).map((_, ndx) => (
          <li
            className="text-sm flex items-center mb-2 justify-between"
            key={ndx}
          >
            <div className="flex items-center gap-2">
              <img className="size-10 rounded-full" src="/avatar.jpg" alt="" />
              <div>
                <span className="dark:text-slate-300 text-slate-700">
                  comment {ndx + 1}
                </span>
                <div className="space-x-3 text-xs dark:text-slate-400 text-slate-600">
                  <span>like</span>
                  <span>reply</span>
                  <span>see 6 replies</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-indigo-500">1 min ago</p>
          </li>
        ))}
        <span className="dark:text-slate-300  text-slate-600">
          load more comments ...
        </span>
      </ul>
      <form className="flex items-center p-4 justify-center gap-1  ">
        <input type="text" className="input" placeholder="add new comment" />
        <div>
          <Button>
            <Send className="bg-indigo-2 size-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
