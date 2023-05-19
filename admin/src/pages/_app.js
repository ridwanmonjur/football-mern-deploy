import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/auth';
import { ProtectRoute } from '@/components/ProtectRoute';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}
