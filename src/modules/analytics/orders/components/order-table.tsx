import React from "react";

function OrderTable({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-brand-darkest">
          <thead className="border-b bg-brand-lightest text-md capitalize text-brand-darkest">
            <tr className="justify-between">
              <th scope="col" className="min-w-[200px] px-6 py-4 text-center">
                Order Id
              </th>
              <th
                scope="col"
                className="min-w-[150px] px-6 py-4 text-center font-medium"
              >
                Date
              </th>
              <th
                scope="col"
                className="min-w-[150px] px-6 py-4 text-center font-medium"
              >
                Status
              </th>
              <th
                scope="col"
                className="min-w-[200px] px-6 py-4 text-center font-medium"
              >
                Customer
              </th>
              <th
                scope="col"
                className="min-w-[150px] px-6 py-4 text-center font-medium"
              >
                Amount(₦)
              </th>
              <th scope="col" className=" px-6 py-4 font-medium">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
}

export default OrderTable;
