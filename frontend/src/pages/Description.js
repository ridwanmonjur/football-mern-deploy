import React from 'react'
import { useParams } from 'react-router-dom'
import { Description } from '../components/description/Description';
import { FetchProduct } from '../api/product';
import WithFetchHOC from '../helper/loader/WithFetchHOC';
export default function DescriptionPage() {
    const { userId } = useParams();
   
    const DescriptionWithFetch = WithFetchHOC(Description, FetchProduct, userId)
    return (
        <>  
        <DescriptionWithFetch /> 
        </>
    )

}

