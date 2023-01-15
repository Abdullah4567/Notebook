import './App.css';
import { Routes, Route } from "react-router-dom";
import Error from './components/Error';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import AuthState from './context/auth/AuthState';
import SignUp from './components/SignUp';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthState>
      <NoteState>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          {/* <Route exact path="*" element={<Error />} /> */}
          {/* for route not found use '*' */}
        </Routes>
        <AppRoutes />
      </NoteState>
    </AuthState>
  );
}

export default App;
