import Signup from "./Pages/Signup/Signup";
import Book from "./Pages/Book/Book";
import Home from "./Pages/Home";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Footer from "./Components/Footer/Footer";

axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path='book/:id' element={<Book/>}/>
          <Route path='/authentication-login' element={<Login/>}/>
          <Route path='/authentication-signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter> 
      <Footer/>
    </div>
  );
}

export default App;
