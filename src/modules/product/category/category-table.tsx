import FadeInOut from "@/components/fade";
import { rubik } from "@/components/fonts";
import React from "react";

function CategoryTable({
  children,
  categoryBtn,
}: {
  children: React.ReactNode;
  categoryBtn: React.ReactNode;
}) {
  return (
    <FadeInOut className="overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-left text-sm text-brand-darkest">
        <thead
          className={`${rubik.className} border-b text-md capitalize text-gray-700`}
        >
          <tr>
            <th scope="col" className="min-w-[70px] px-6 py-4 font-bold">
              id
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              Name
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              Status
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              Icon
            </th>
            <th
              scope="col"
              className="min-w-[170px] px-4 py-4 text-center font-medium"
            >
              {categoryBtn}
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </FadeInOut>
  );
}

export default CategoryTable;
