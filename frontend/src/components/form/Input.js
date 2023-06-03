import { forwardRef } from 'react';

export const Input = forwardRef(({
    type,
    classNames,
    text,
    defaultValue="",
    onClick, 
    ...props}, ref)=>{
    return (
        <input 
            type={type}
            ref={ref}
            defaultValue={defaultValue}
            onClick={onClick}
            className={`form-control font-larger ${classNames!==undefined ? classNames : ""}`}
            {...props}                
        />
    )
})