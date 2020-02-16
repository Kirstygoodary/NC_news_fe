import React from "react";

const ErrorPage = ({ err }) => {
  return <p>Oops, {err.message}</p>;
};

// add isLoading toggle
export default ErrorPage;
