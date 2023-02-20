import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectNotifications, setNotificationStatus } from "../../redux/slices/NotificationSlice";

function ScrollToTop({ history, children }) {
  const state = useSelector(selectNotifications)
  const dispatch = useDispatch()
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      dispatch(setNotificationStatus("inactive"))
      console.log({ state })
    });
    return () => {
      unlisten();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;;
}

export default withRouter(ScrollToTop);