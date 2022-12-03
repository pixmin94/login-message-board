import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/Navbar'
import Message from './components/Message'
import './App.css';

function App() {
    const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //   fetch("/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));
    // }, []);
  
    return (
      <div className="App">
        <NavBar />
        <Message />
        {/* <header className="App-header">
          <p>{!data ? "Loading..." : data}</p>
        </header> */}
      </div>
    );
}

export default App;