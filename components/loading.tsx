import React from "react";
import { PropagateLoader } from "react-spinners";
type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full flex-1 h-full flex justify-center items-center flex-col">
      <p className="mb-3 text-xl">Loading</p>
      <PropagateLoader color="white" />
    </div>
  );
};

export default Loading;
