import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/Navbar'
import Message from './components/Message'
import Account from './components/Account'
import './App.css';

function App() {
    const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //   fetch("/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));
    // }, []);
  
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login-message-board" element={<Message />} />
          <Route path="/login-message-board/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
