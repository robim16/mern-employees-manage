
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Empleado from './pages/empleado/Empleado';
import NewEmpleado from './pages/new/NewEmpleado';
import { EditEmpleado } from './pages/edit/EditEmpleado';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}>
            </Route>
            <Route path=':id' element={<Empleado/>}>
            </Route>
            <Route path='edit/:id' element={<EditEmpleado/>}>
            </Route>
            <Route path='new' element={<NewEmpleado/>}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
