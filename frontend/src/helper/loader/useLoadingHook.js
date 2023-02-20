import { useState, useCallback } from "react";
const useLoadingError = (action) => {
  const [state, setState] = useState({
    loading: false, eror: false
  });

  const doAction = useCallback((...args) => {
    setState({ loading: true, eror: false });
    return action(...args)
      .catch(() => setState({ loading: false, eror: false }))
      // .finally(() => setState({ loading: false, eror: true }));
  }, [action]
  )
  return { loading: state.loading, error: state.error, doAction };
};
/*
    const [data, setData] = useState([])
    const { loading, error, doAction } = useLoadingError(fetchFunction)
    useEffect(()=> {
        doAction().then((data)=> data.json()).then((data)=> setData(data))
    })
    return (
        {loading && <>Spinner</>}
        {error && <>Error</>}
        {!error && !loading && <>{data.map((value)=> ( <div> .... </div> ) )}</>}
    )
*/

export default useLoadingError;