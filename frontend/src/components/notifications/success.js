
import React from "react";
import { MDBContainer, MDBAlert } from 'mdbreact';

const Success = ({text, }) => {
  return (
    <MDBContainer>

      <MDBAlert color="warning" dismiss >
        {text}
      </MDBAlert>

    </MDBContainer>
  );
};

export default Success;