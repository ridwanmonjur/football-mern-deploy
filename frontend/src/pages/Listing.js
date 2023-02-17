import React, { useEffect } from 'react'
import EcommerceGridVertical from '../components/EcommerceGridVertical'
import Overlay from '../components/Overlay'
import JerseyImg from "../assets/Jerseys.jpg"
import AccessoriesImg from "../assets/Accessories.jpg"
import BootsImg from "../assets/Boots.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll, selectProducts } from '../redux/slices/ProductSlice'
import { useParams } from 'react-router-dom'

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

function JerseysPartTwo() {

    const { productName } = useParams();

    let elem = useSelector(selectProducts)
    const dispatch = useDispatch()
    useEffect(() => {
        let controller = new AbortController();
        async function fetchData() {
            try {
                const originalPromiseResult = await dispatch(fetchAll(productName)).unwrap()
                if (originalPromiseResult.product)
                    console.log({ okay: originalPromiseResult })
            } catch (rejectedValueOrSerializedError) {
                console.log({ failed: rejectedValueOrSerializedError })
            }
        }

        fetchData()

        return () => {
            return () => controller?.abort();
        }
    }, [elem.length])

    return (
        <div>
            <Overlay imgSrc={description[productName]['img']} alt={productName} >
                <h1>{description[productName]['h1']}</h1>
                <h2>{description[productName]['h2']}</h2>
            </Overlay>
            <EcommerceGridVertical productName={productName} data={elem} />
        </div>
    )
}

export default JerseysPartTwo
