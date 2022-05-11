import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { Appointment, About, Home, Login } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {location.pathname !== '/login' && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
