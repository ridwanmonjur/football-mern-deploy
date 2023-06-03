import { MDBBtn } from "mdbreact"

export const Button = ({
    type,
    classNames,
    children,
    onClick
})=>{
    return (
        <MDBBtn 
            onClick={onClick}
            color=""
            className={`${classNames!=undefined ? classNames : ""}`}
            {...(type!==null ? {type} : {})}                >
                    {children}
            </MDBBtn>
    )
}
