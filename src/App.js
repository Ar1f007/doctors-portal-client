import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Navbar, PrivateRoute, ConfirmEmailAlert } from './components';
import { Appointment, About, Home, Login, SignUp } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

import auth from './config/firebase.config';

function App() {
  const [showAlert, setShowAlert] = useState(true);
  const location = useLocation();
  const [user] = useAuthState(auth);

  return (
    <>
      {user && !user?.emailVerified && showAlert && (
        <ConfirmEmailAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      )}

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>

      {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
