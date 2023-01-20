import './App.css';
import { Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import AuthState from './context/auth/AuthState';
import SignUp from './components/SignUp';
import AppRoutes from './routes/AppRoutes';
import Alert from './components/Alerts';
import AlertState from './context/alert/AlertState';

function App() {
  return (
    <>
      <AlertState>
        <AuthState>
          <NoteState>
            <Alert />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              {/* <Route exact path="/a" element={<Alert />} /> */}
              {/* <Route exact path="*" element={<Error />} /> */}
              {/* for route not found use '*' */}
            </Routes>
            <AppRoutes />
          </NoteState>
        </AuthState>
      </AlertState>
    </>
  );
}

export default App;
