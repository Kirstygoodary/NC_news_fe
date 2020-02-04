import React from "react";

const ErrorPage = ({ err }) => {
  return (
    <p>
      Oops, {err.data.msg} , {err.status}
    </p>
  );
};

// add isLoading toggle
export default ErrorPage;
