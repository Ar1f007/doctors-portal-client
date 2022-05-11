import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { About, Home, Login } from './pages';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
