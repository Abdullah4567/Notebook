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
      <div className="container">
        <Routes>
          {/* for route not found use '*' */}
          <Route exact path="*" element={<Error />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
        </Routes>
      </div>
    </NoteState>
  );
}

export default App;
