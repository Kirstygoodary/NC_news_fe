import React from "react";

const ErrorPage = ({ err }) => {
  console.log(JSON.stringify(err));
  return <p>Oops, {err.message}</p>;
};

// add isLoading toggle
export default ErrorPage;
