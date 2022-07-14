import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route, Routes, useNavigate} from "react-router-dom";
import Login from './components/login';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin, setLogin } from './features/login/loginSlice';
import { useEffect } from 'react';
import { auth } from './firebase';
import { setUserLoginDetails } from './features/user/userSlice';


function App() {
  const login=useSelector(selectLogin);
  const dispatch=useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged(async(user)=>{
      if(user){
          setLoggedIn(true);
          setUser(user);
      }else{
        setLoggedIn(false);
      }
    })  
  },[login]);
  const setUser=(user)=>{
    dispatch(setUserLoginDetails({
        name:user.displayName,
        email:user.email,
        photo:user.photoURL
    }))
}
  const setLoggedIn=(c)=>{
      dispatch(setLogin({
          loggedIn:c
      }))
  }

  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/detail/:id" element={<Detail/>}/>
        
        </Routes>
        </Router>
    </div>
  );
}

export default App;
