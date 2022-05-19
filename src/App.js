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

            <Route
              path="users"
              element={
                <RequireAdmin>
                  <AllUser />
                </RequireAdmin>
              }
            />

            <Route
              path="add-doctor"
              element={
                <RequireAdmin>
                  <AddDoctor />
                </RequireAdmin>
              }
            />

            <Route path="reviews" element={<MyReview />} />
          </Route>
        </Route>

        <Route path="/about" element={<About />} />

        <Route element={<UserExists />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
