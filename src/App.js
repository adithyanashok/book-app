import Signup from "./Pages/Signup/Signup";
import Book from "./Pages/Book/Book";
import Home from "./Pages/Home";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Footer from "./Components/Footer/Footer";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile/Profile";
import AddBooks from "./Pages/AddBooks/AddBooks";
import UpdateBook from "./Pages/UpdateBook/UpdateBook";
import { useSelector } from "react-redux";
import EditProfile from "./Pages/Signup/EditProfile";

axios.defaults.withCredentials = true
function App() {
  const user = useSelector((state) => state?.user?.currentUser)
  console.log(user)
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} /> 
          <Route path='book/:id' element={<Book/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to="/" replace />}/>
          <Route path='/signup' element={!user && <Signup/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/profile' element={user ? <Profile/> : <Navigate to="/login" replace /> }/>
          <Route path='/add-book' element={user ? <AddBooks/> : <Navigate to="/login" replace />}/>
          <Route path='/update-book/:id' element={user ? <UpdateBook/> : <Navigate to="/login" replace />}/>
          <Route path='*' element={<Home/>} />
        </Routes>
      </BrowserRouter> 
      <Footer/>
    </div>
  );
}

export default App;
