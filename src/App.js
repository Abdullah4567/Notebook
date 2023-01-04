import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Error from './components/Error';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        {/* for route not found use '*' */}
        <Route exact path="*" element={<Error />} />
      </Routes>
    </NoteState>
  );
}

export default App;
