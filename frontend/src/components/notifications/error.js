import React from "react";
import errorAnimation from "../../lottie/error.json";
import { Player } from '@lottiefiles/react-lottie-player';

const Error = () => {
    

    return (
        <div className="d-flex justify-content-center my-8 py-8">
            <Player
               src={errorAnimation}
               className="player"
               loop
               autoplay
               style={{ height: '300px', width: '300px' }}
            />
        </div>
    );
}


export default Error;