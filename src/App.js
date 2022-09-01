import "react-toastify/dist/ReactToastify.css";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Album from "./pages/album/Album";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path="/album" element={<Album />} />

          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
