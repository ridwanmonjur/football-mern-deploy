import { MDBContainer } from 'mdbreact';
import React, {useEffect} from 'react';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Routes from './pages/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './redux/slices/ProfileSlice';
import 'rodal/lib/rodal.css';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
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
