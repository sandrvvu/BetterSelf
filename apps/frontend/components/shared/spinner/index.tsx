"use client";

import { BounceLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex justify-center h-full items-center w-full p-10">
      <BounceLoader color="#8b5cf6" size={60} />
    </div>
  );
}
