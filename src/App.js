import './App.css';
import Navbar from './components/Navbar';
import Carosel from './components/Carosel';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Admin from './components/Admin'
import NoteState from './context/vehicle/NoteState';

function App() {
  return (
    
  <BrowserRouter>
  <NoteState>
  <Routes>
    <Route path="/" element={
      <>
       <Navbar/>
       <Carosel/>
       <Cards/>
        <Footer/> 
       </> }/>
  <Route path="login" element={<Login/>}/>
  <Route path="signup" element={<Signup/>}/>
  <Route path="admin" element={<Admin/>}/>
  </Routes>
  </NoteState>
   </BrowserRouter>
  );
}

export default App;
