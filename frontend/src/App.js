import React, { useEffect } from 'react';
import Routes from './pages/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './redux/slices/ProfileSlice';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  )
}

export default App
