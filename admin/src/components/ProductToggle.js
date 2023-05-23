import { useState } from "react"

export const ProductToggle = ({
    toggleFunction
}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {!open ?
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-6 h-6 inline cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            setOpen(true)
                            toggleFunction()
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>


                </> :
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-6 h-6 inline cursor-pointer hover:text-blue-500"
                        onClick={(event) => {
                            setOpen(false)
                            toggleFunction()
                        }}
                    >  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>

                </>
            }
        </>
    );
};
