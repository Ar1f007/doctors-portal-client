import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Footer,
  Navbar,
  PrivateRoute,
  ConfirmEmailAlert,
  MyReview,
  MyAppointments,
  UserExists,
  RequireAdmin,
  Payment,
} from './components';
import {
  Appointment,
  About,
  Home,
  Login,
  SignUp,
  ForgotPassword,
  Dashboard,
  PageNotFound,
  AllUser,
  AddDoctor,
  ManageDoctors,
} from './pages';
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

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<MyAppointments />} />
            <Route path="reviews" element={<MyReview />} />
            <Route path="payment/:id" element={<Payment />} />

            <Route element={<RequireAdmin />}>
              <Route path="users" element={<AllUser />} />
              <Route path="add-doctor" element={<AddDoctor />} />
              <Route path="manage-doctors" element={<ManageDoctors />} />
            </Route>
          </Route>
        </Route>

        <Route element={<UserExists />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
