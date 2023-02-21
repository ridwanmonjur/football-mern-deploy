import { useState, useCallback } from "react";
import { toast } from "react-toastify";

const useLoadingError = (action) => {
  const [state, setState] = useState({
    loading: false, eror: false
  });

  const doAction = useCallback((...args) => {
    setState({ loading: true, eror: false });
    return action(...args)
      .catch((error) => {
        setState({ loading: false, error })
        toast.error(error.message)
    })
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