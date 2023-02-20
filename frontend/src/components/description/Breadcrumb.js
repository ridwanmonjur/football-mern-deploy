import { MDBBreadcrumb, MDBContainer, MDBBreadcrumbItem } from "mdbreact";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ type, productName, productid }) => {
    return (
        <MDBContainer className="mt-2 pt-4 mb-0">
            <MDBBreadcrumb style={{ backgroundColor: "transparent" }} >
                <MDBBreadcrumbItem >
                    <Link to="/" className="text-warning font-weight-bold"> Home </Link>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem className="text-capitalize">
                    <Link to={`/products/${type.toLowerCase()}`} className="text-warning font-weight-bold">
                        {type}
                    </Link>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem >
                    <Link to={`/products/${type.toLowerCase()}/${productid}`} className="text-warning font-weight-bold">
                        {productName}
                    </Link>
                </MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBContainer>
    );
};