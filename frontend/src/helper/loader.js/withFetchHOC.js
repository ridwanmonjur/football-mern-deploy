/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useEffect } from "react";

const withFetch = (WrappedComponent, fetchFunction, args) => {
    const [state, setState] = useState({
        loading: false, error: false, data: []
    });

    const handleFetch = useCallback(async () => {
        Function.call(fetchFunction, ...args)
            .then((data) => setState({ data, loading: false, error: false }))
            .catch((error) => setState({ data: [], loading: false, error }))
            .finally(() => { setState((prev) => { return { data: prev.data, loading: false, error: true } }) });
    }, [args, fetchFunction]);

    useEffect(() => {
        let controller = new AbortController();
        
        handleFetch();

        return () => {
            return () => controller?.abort();
        }
    }, [handleFetch])
    if (state.error) return <p>Error</p>;
    return (
        <>
            {
                !state.error && !state.loading ?
                    (
                        state.data && state.data[0] !== undefined ?
                            <WrappedComponent data={state.data} />
                            :
                            <h1>No products to display</h1>
                    ) :
                    <>
                        {
                            state.error && <> Error </>
                        }
                        {
                            state.loading && <> loading </>
                        }

                    </>
            }
        </>
    )
}

export default withFetch;