import React, { useEffect } from 'react';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { api } from './api/api';
import Routes from './pages/routes';

function App() {
  useEffect(() => {
    let controller = new AbortController();
    async function fetchData() {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await api('GET', 'current', {
          mode: 'cors',
        })
      } catch (error) {
        console.log({ failed: error })
      }
    }

    fetchData()

    return () => {
      return () => controller?.abort();

    }
  }, [])

  return (
    // DESCRIPTION ROUTE IS IN THE PROFILE PAGE. IT'S AN EMBEDDED ROUTE
    <div>
      <Navbar />

      <Routes />

      <Footer />
    </div>
  )
}

export default App
