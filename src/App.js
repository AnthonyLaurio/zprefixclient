import './stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import RouterHandler from './components/RouterHandler';
import cookie from 'cookie';
import { createContext, useState } from 'react';

export const myContext = createContext();

function App() { 
  const [cookies, setCookies] = useState(cookie.parse(document.cookie));

  return (
    <div className="App vh-100 vw-100">
      <myContext.Provider value={{cookies, setCookies}}>
      <header className="App-header bg-secondary">
        <NavBar />
      </header>
      <div className="App-body bg-secondary">
        <RouterHandler />
      </div>
      </myContext.Provider>
    </div>
  );
}

export default App;
