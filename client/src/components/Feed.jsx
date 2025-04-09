import React from "react";

export default function Feed() {
  return (
    <>
      <ul
        aria-label="Nested user feed"
        role="feed"
        className="relative flex  flex-col gap-4 py-4 pl-6 before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-slate-600 dark:before:border-slate-600 "
      >
        <li role="article" className="relative pl-4 ">
          <div className="flex flex-col flex-1 gap-2">
            <a
              href="#"
              className="absolute z-10 inline-flex items-center justify-center w-6 h-6 text-white rounded-full -left-3 ring-2 ring-white"
            >
              <img
                src="https://i.pravatar.cc/48?img=13"
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
            <h4 className="flex flex-col items-start text-sm md:text-base font-medium leading-6 text-slate-600 dark:text-gray-200 md:flex-row lg:items-center">
              <span className="flex-1">
                Manos Gaitanakis
                <span className="md:text-sm font-normal text-xs text-slate-400">
                  {" "}
                  commented
                </span>
              </span>
              <span className="text-xs font-normal text-slate-400">
                3 hours ago
              </span>
            </h4>
            <p className="text-sm text-slate-500 dark:text-gray-300">
              Love it! I really like how the nested feeds are working as well.
              Is that going to be multi-nested? Or maybe stay in just one level.
              Also any ides on how I can remove the time stamp from the feeds?
            </p>
          </div>
          <ul
            role="group"
            className="relative  flex flex-col gap-5 py-12 pl-6 before:absolute before:top-6 before:left-6 before:bottom-6 before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-12 after:left-6 after:bottom-12 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-slate-600 dark:before:border-slate-600"
          >
            {Array.from({ length: 2 }).map((item, ndx) => (
              <li key={ndx} role="article" className="relative pl-6 ">
                <div className="flex flex-col flex-1 ">
                  <a
                    href="#"
                    className="absolute z-10 inline-flex items-center justify-center w-6 h-6 text-white rounded-full -left-3 ring-2 ring-white"
                  >
                    <img
                      src="https://i.pravatar.cc/48?img=1"
                      alt="user name"
                      title="user name"
                      width="48"
                      height="48"
                      className="max-w-full rounded-full"
                    />
                  </a>
                  <h4 className="flex flex-col items-start text-base font-medium leading-6 text-slate-600 dark:text-gray-200 md:flex-row lg:items-center">
                    <span className="flex-1">
                      Mary Jane{" "}
                      <span className="text-xs md:text-sm font-normal text-slate-400">
                        replied
                      </span>
                    </span>
                    <span className="text-xs font-normal text-slate-400">
                      2 hours ago
                    </span>
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-gray-300">
                    Hey john! Did you had a look at the new component?
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
