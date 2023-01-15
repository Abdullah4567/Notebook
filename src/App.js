import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Error from './components/Error';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import AuthState from './context/auth/AuthState';
import SignUp from './components/SignUp';

function App() {
  return (
    <AuthState>
      <NoteState>
        <Navbar />
        <div className="container">
          <Routes>
            {/* for route not found use '*' */}
            <Route exact path="*" element={<Error />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </NoteState>
    </AuthState>
  );
}

export default App;
