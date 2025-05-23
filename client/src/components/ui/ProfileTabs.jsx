import React, { useState, useRef, useEffect } from "react";

export default function ProfileTabs() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      {/*<!-- Component: Basic lg sized tab with leading icon --> */}
      <section className="max-w-full" aria-multiselectable="false">
        <ul
          className="flex items-center border-b border-slate-200"
          role="tablist"
          ref={wrapperRef}
        >
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-indigo-50 hover:stroke-indigo-600 focus:bg-indigo-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 1
                  ? "border-indigo-500 stroke-indigo-500 text-indigo-500 hover:border-indigo-600  hover:text-indigo-600 focus:border-indigo-700 focus:stroke-indigo-700 focus:text-indigo-700 disabled:border-slate-500"
                  : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-indigo-500 hover:text-indigo-500 focus:border-indigo-600 focus:stroke-indigo-600 focus:text-indigo-600 disabled:text-slate-500"
              }`}
              id="tab-label-1ai"
              role="tab"
              aria-setsize="3"
              aria-posinset="1"
              tabindex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
              aria-controls="tab-panel-1ai"
              aria-selected={`${
                tabSelected.currentTab === 1 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <span className="order-2 ">Tab 1</span>
              <span className="relative only:-mx-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden h-6 w-6 sm:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-77a desc-77a"
                >
                  <title id="title-77a">Icon title</title>
                  <desc id="desc-77a">
                    A more detailed description of the icon
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </span>
            </button>
          </li>
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-indigo-50 hover:stroke-indigo-600 focus:bg-indigo-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 2
                  ? "border-indigo-500 stroke-indigo-500 text-indigo-500 hover:border-indigo-600  hover:text-indigo-600 focus:border-indigo-700 focus:stroke-indigo-700 focus:text-indigo-700 disabled:border-slate-500"
                  : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-indigo-500 hover:text-indigo-500 focus:border-indigo-600 focus:stroke-indigo-600 focus:text-indigo-600 disabled:text-slate-500"
              }`}
              id="tab-label-2ai"
              role="tab"
              aria-setsize="3"
              aria-posinset="2"
              tabindex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
              aria-controls="tab-panel-2ai"
              aria-selected={`${
                tabSelected.currentTab === 2 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <span className="order-2 ">Tab 2</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden h-6 w-6 sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-77b desc-77b"
              >
                <title id="title-77b">Icon title</title>
                <desc id="desc-77b">
                  A more detailed description of the icon
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </button>
          </li>
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-indigo-50 hover:stroke-indigo-600 focus:bg-indigo-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 3
                  ? "border-indigo-500 stroke-indigo-500 text-indigo-500 hover:border-indigo-600  hover:text-indigo-600 focus:border-indigo-700 focus:stroke-indigo-700 focus:text-indigo-700 disabled:border-slate-500"
                  : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-indigo-500 hover:text-indigo-500 focus:border-indigo-600 focus:stroke-indigo-600 focus:text-indigo-600 disabled:text-slate-500"
              }`}
              id="tab-label-3ai"
              role="tab"
              aria-setsize="3"
              aria-posinset="3"
              tabindex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
              aria-controls="tab-panel-3ai"
              aria-selected={`${
                tabSelected.currentTab === 3 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
            >
              <span className="order-2 ">Tab 3</span>
              <span className="relative only:-mx-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden h-6 w-6 sm:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-77c desc-77c"
                >
                  <title id="title-77c">Icon title</title>
                  <desc id="desc-77c">
                    A more detailed description of the icon
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </span>
            </button>
          </li>
        </ul>
        <div className="">
          <div
            className={`px-6 py-4 ${
              tabSelected.currentTab === 1 ? "" : "hidden"
            }`}
            id="tab-panel-1ai"
            aria-selected={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-1ai"
            tabindex="-1"
          >
            <p>
              What is the recipe for successful achievement? To my mind there
              are just four essential ingredients: Choose a career you love,
              give it the best there is in you, seize your opportunities, and be
              a member of the team.
            </p>
          </div>
          <div
            className={`px-6 py-4 ${
              tabSelected.currentTab === 2 ? "" : "hidden"
            }`}
            id="tab-panel-2ai"
            aria-selected={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-2ai"
            tabindex="-1"
          >
            <p>
              One must be entirely sensitive to the structure of the material
              that one is handling. One must yield to it in tiny details of
              execution, perhaps the handling of the surface or grain, and one
              must master it as a whole.
            </p>
          </div>
          <div
            className={`px-6 py-4 ${
              tabSelected.currentTab === 3 ? "" : "hidden"
            }`}
            id="tab-panel-3ai"
            aria-selected={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-3ai"
            tabindex="-1"
          >
            <p>
              Even though there is no certainty that the expected results of our
              work will manifest, we have to remain committed to our work and
              duties; because, even if the results are slated to arrive, they
              cannot do so without the performance of work.
            </p>
          </div>
        </div>
      </section>
      {/*<!-- End Basic lg sized tab with leading icon --> */}
    </>
  );
}
