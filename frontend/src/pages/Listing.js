import React, { useEffect, useState } from 'react'
import EcommerceGridVertical from '../components/EcommerceGridVertical'
import Overlay from '../components/Overlay'
import JerseyImg from "../assets/Jerseys.jpg"
import AccessoriesImg from "../assets/Accessories.jpg"
import BootsImg from "../assets/Boots.jpg"
import { useParams } from 'react-router-dom'
import { FetchAll } from '../api/product'

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

    let [data, setData] = useState({
        loading: true,
        data: [],
        error: false
    })

    useEffect(() => {
        let controller = new AbortController();

        async function fetchData() {
            await FetchAll(productName)
                .then((result) => {
                    console.log({data})
                    setData({ error: false, data: result, loading: false })
                })
                .catch((err) => {
                    setData({ loading: true, data: [], error: false })
                })
        }

        fetchData()
        return () => {
            return () => controller?.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length])


    return (

        <div>
            <Overlay imgSrc={description[productName]['img']} alt={productName} >
                <h1>{description[productName]['h1']}</h1>
                <h2>{description[productName]['h2']}</h2>
            </Overlay>
            {
                !data.error && !data.loading ?
                    (
                        data.data && data.data[0] !== undefined ?
                            <EcommerceGridVertical productName={productName} data={data.data} />
                            :
                            <h1>No products to display</h1>
                    ) :
                    <>
                        {
                            data.error && <> Error </>
                        }
                        {
                            data.loading && <> loading </>
                        }

                    </>
            }
        </div>
    )
}

export default Listing
