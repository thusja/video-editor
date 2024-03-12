import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Login from 'pages/Login';
import Enquiry from 'pages/Enquiry';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route index element={<MainPage />} />
          <Route path="/videoEditor" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enquiry" element={<Enquiry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
