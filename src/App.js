import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Error from './components/Error';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Error />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
