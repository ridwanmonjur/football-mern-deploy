import React from "react";
import { MDBContainer, MDBAlert } from 'mdbreact';

const AlertPage = ({ text }) => {
  return (
    <MDBContainer>

      <MDBAlert color="info" dismiss>
        {text}
      </MDBAlert>

    </MDBContainer>
  );
};

export default AlertPage;