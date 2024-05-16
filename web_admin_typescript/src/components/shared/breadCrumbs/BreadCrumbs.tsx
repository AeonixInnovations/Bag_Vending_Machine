import React from "react";

const BreadCrumbs = ({ items }: any) => {
  return (
    <div className="mt-16">
      <div className="container flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap">
        <a href="#" className="text-gray-600 dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>

        {items.map((item: any, index: any) => (
          <React.Fragment key={index}>
            <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <a
              href={item.href}
              className={`text-${
                item.active
                  ? "blue-600 dark:text-blue-400"
                  : "gray-600 dark:text-gray-200"
              } hover:underline`}
            >
              {item.text}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BreadCrumbs;
