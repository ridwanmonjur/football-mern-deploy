import React from "react";
import { SpinnerRoundOutlined } from 'spinners-react';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center my-8 py-8">
      <SpinnerRoundOutlined enabled={true}  color="orange" size="200px" />
    </div>
  );
}


export default Spinner;