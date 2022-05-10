import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { About, Home } from './pages';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
