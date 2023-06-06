/* eslint-disable eqeqeq */

export const Button = ({
    type,
    classNames,
    children,
    onClick
})=>{
    return (
        <button 
            onClick={onClick}
            color=""
            className={`btn btn-sm ${classNames!=undefined ? classNames : ""}`}
            {...(type!==null ? {type} : {})}>
                    {children}
            </button>
    )
}
