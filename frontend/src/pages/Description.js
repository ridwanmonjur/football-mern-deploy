import React from 'react'
import { useParams } from 'react-router-dom'
import { Description } from '../components/description/Description';
import { FetchProduct } from '../api/product';
import WithFetchHOC from '../helper/loader/WithFetchHOC';
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { MDBContainer } from "mdbreact";

export default function DescriptionPage() {
    const { userId } = useParams();

    const DescriptionWithFetch = WithFetchHOC(Description, FetchProduct, userId)
    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid className="main-container">
                <div className='wrapper'>
                    <DescriptionWithFetch />
                </div>
            </MDBContainer>
            <Footer />
        </>
    )

}

