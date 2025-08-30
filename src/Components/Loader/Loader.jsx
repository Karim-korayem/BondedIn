import React from "react";
import {PulseLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#2623fa" />{" "}
    </div>
  );
}
