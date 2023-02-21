import React from "react";
import emptyAnimation from "../../lottie/empty.json";
import { Player } from '@lottiefiles/react-lottie-player';

const Empty = () => {
    

    return (
        <div className="d-flex justify-content-center my-8 py-8">
            <Player
               src={emptyAnimation}
               className="player"
               loop
               autoplay
               style={{ height: '300px', width: '300px' }}
            />
        </div>
    );
}


export default Empty;