
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
