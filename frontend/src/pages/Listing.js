import React, { useEffect } from 'react'
import GridVertical from '../components/common/GridVertical'
import Overlay from '../components/listing/Overlay'
import JerseyImg from "../assets/Jerseys.jpg"
import AccessoriesImg from "../assets/Accessories.jpg"
import BootsImg from "../assets/Boots.jpg"
import { useParams } from 'react-router-dom'
import { FetchAll } from '../api/product'
import useLoadingFetchError from '../helper/loader/useFetchHook'
import Spinner from '../components/notifications/spinner'
import Error from '../components/notifications/error'

const description = {
    jerseys: {
        img: JerseyImg,
        h1: "THE HEROES",
        h2: "OF OLD"
    },
    boots: {
        img: BootsImg,
        h1: "PREMIUM QUALITY",
        h2: "BOOTS AND FOOTWEAR"
    },
    accessories: {
        img: AccessoriesImg,
        h1: "THE VERY BEST",
        h2: "FOOTBALL ACCESSORIES"
    },
}

function Listing() {

    const { productName } = useParams();

    let { data, error, loading } = useLoadingFetchError(FetchAll, productName)

    console.log( { data, error, loading } )

    useEffect(() => {
        let controller = new AbortController();

        return () => {
            return () => controller?.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (

        <div>
            <Overlay imgSrc={description[productName]['img']} alt={productName} >
                <h1>{description[productName]['h1']}</h1>
                <h2>{description[productName]['h2']}</h2>
            </Overlay>
            {
                !error && !loading ?
                    (
                        data && data[0] !== undefined &&
                        <GridVertical productName={productName} data={data} />

                    ) :
                    <>
                        {
                            error && <> <Error /> </>
                        }
                        {
                            loading && <> <Spinner /> </>
                        }

                    </>
            }
            <br/>
        </div>
    )
}

export default Listing
