import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useLoadingFetchError = (fetchFunction, args) => {
    const [state, setState] = useState({
        loading: true, eror: false, data: []
    });

    useEffect(() => {
        let controller = new AbortController();
        setState({ loading: true, eror: false, data: [] });

        fetchFunction(args)
            .then((data) => {
                console.log({ data })
                setState({ data, loading: false, error: false })
            })
            .catch((error) => {
                setState({ loading: false, error: error, data: null })
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            })
        // .finally(() => { setState((prev) => { return { data: prev.data, loading: false, eror: true } }) });

        return () => {
            return () => controller?.abort();
        }

    }, [args, fetchFunction])

    return { loading: state.loading, error: state.error, data: state.data };
};
/*
    const [data, setData] = useState([])
    const { loading, error, data } = useLoadingFetchError(fetchFunction)
    return (
        {loading && <>Spinner</>}
        {error && <>Error</>}
        {!error && !loading && data && <>{data.map((value)=> ( <div> .... </div> ) )}</>}
    )
*/

export default useLoadingFetchError;