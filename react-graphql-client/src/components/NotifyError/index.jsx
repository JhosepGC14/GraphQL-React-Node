import React from "react";

const NotifyError = ({ errorMessage }) => {
  if (errorMessage === null) return null;

  return (
    <div style={{ color: "red", position: "fixed", top: 10, width: "100%" }}>
      {errorMessage}
    </div>
  );
};

export default NotifyError;
