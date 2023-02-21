import { MDBContainer } from "mdbreact";
import React, { useState, useCallback, useEffect } from "react";
import Error from "../../components/notifications/error";
import Spinner from "../../components/notifications/spinner";
import { toast } from "react-toastify";

const WithFetchHOC = (WrappedComponent, fetchFunction, args) => {
    const WithStateComponent = () => {
        const [state, setState] = useState({
            loading: true, error: false, data: []
        });

        const handleFetch = useCallback(async () => {
            fetchFunction(args)
                .then((data) => setState({ data, loading: false, error: false }))
                .catch((error) => {
                    setState({ data: [], loading: false, error })
                    toast.error(error.message)
                })
            // .finally(() => { setState((prev) => { return { data: prev.data, loading: false, error: true } }) });
        }, []);

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
                    !state.error && !state.loading && state.data &&
                    <WrappedComponent data={state.data} />
                }
                {
                    (state.error || state.loading) &&
                    <MDBContainer fluid className="d-flex align-items-center justify-content-center main-container">

                        {
                            state.error && <>
                                <Error /> </>
                        }
                        {
                            state.loading && <> <Spinner /> </>
                        }

                    </MDBContainer>
                }
            </>
        )
    }
    return WithStateComponent
}

export default WithFetchHOC;