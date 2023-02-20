import { MDBContainer } from 'mdbreact';
import React from 'react';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Routes from './pages/routes';

function App() {


  return (
    <>
      <Navbar />
      <MDBContainer fluid className="main-container">
        <Routes />
      </MDBContainer>
      <Footer />
    </>
  )
}

export default App
