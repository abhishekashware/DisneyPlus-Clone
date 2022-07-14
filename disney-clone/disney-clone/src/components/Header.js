import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth, provider, signInPopup } from '../firebase';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { selectUserName,selectUserEmail,selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice';
import { setUserId } from 'firebase/analytics';
import { selectLogin, setLogin } from '../features/login/loginSlice';
import logo from "../assets/images/logo.svg";
import SeriesIcon from "../assets/images/series-icon.svg";
import MovieIcon from "../assets/images/movie-icon.svg";
import OriginalIcon from "../assets/images/original-icon.svg";
import HomeIcon from "../assets/images/home-icon.svg";
import SearchIcon from "../assets/images/search-icon.svg";
import WatchlistIcon from "../assets/images/watchlist-icon.svg";




const Nav=styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;
background-color: #090b13;
`;

const Logo=styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;
img{
    display: block;
    width: 100%;
}
`;

const NavMenu=styled.div`
display: flex;
align-items: center;
flex-grow: row nowrap;
height: 100%;
justify-content: flex-end;
margin: 0px;
padding: 0px;
position: relative;
margin-right: auto;
margin-left: 25px;

a{
    display: flex;
    align-items: center;
    padding: 0 12px;

    img{
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }

    span{
        color: rgb(249,249,249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;

    &:before{
        background-color: rgb(249,249,249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        opacity: 0;
        left: 0px;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        width: auto;
        visibility: hidden;
        transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
        }
    }
    &:hover{
    span:before{
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
    }
}
}


@media (max-width:890px){
    display: none;    
}
`;
const LoginB=styled.a`
background-color: rgba(0,0,0,0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border:1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease-out;
&:hover{
    background-color: #f9f9f9;
    color:#000;
    border-color: transparent;
}
`;

const UserImg=styled.img`
height: 100%;

`;


const DropDown=styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgb(19,19,19);
border: 1px solid rgba(151,151,151,0.34);
border-radius: 4px;
box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
padding: 10px;
font-size: 14px;
letter-spacing: 3px;
width: 101px;
opacity: 0;
`;

const SignOut=styled.div`
position: relative;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;
${UserImg}{
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
&:hover{
    ${DropDown}{
        opacity: 1;
        transition-duration: 1s;

    }
}
`;
export default function Header(props) {
    const dispatch=useDispatch();
    const userPhoto=useSelector(selectUserPhoto);
    const loggedIn=useSelector(selectLogin);
    const navigate=useNavigate();

    const setUser=(user)=>{
        dispatch(setUserLoginDetails({
            name:user.displayName,
            email:user.email,
            photo:user.photoURL
        }))
      };

      const setLoggedIn=(c)=>{
        dispatch(setLogin({
            loggedIn:c
        }))
      }

    const handleAuth=(e)=>{
          if(!loggedIn){
                signInPopup().then((res)=>{
                    setUser(res.user);
                    setLoggedIn(true); 
                    localStorage.setItem("isLoggedIn","true");
                })
                .catch(err=>alert(err.message));
             }
            else if(loggedIn){
                auth.signOut().then(()=>{
                    dispatch(setSignOutState());
                    setLoggedIn(false);
                    localStorage.clear();
                    navigate('/');
                }).catch((err)=>alert(err.message))
            }
    }
    
  return (
   <Nav>
    <Logo>
        <img key="disneylogo" src={logo} onClick={(e)=>navigate('/')} alt="disney"/>
    </Logo>
    {loggedIn?
        <>
       <NavMenu>
       <a href='/home'>
           <img key="home" src={HomeIcon} alt="home"/>
           <span>HOME</span>

       </a>
       <a href='/search'>
           <img key="search" src={SearchIcon} alt="home"/>
           <span>SEARCH</span>

       </a>
       <a href='/watchlist'>
           <img key="watchlist" src={WatchlistIcon} alt="home"/>
           <span>WATCHLIST</span>

       </a>
       <a href='/originals'>
           <img key="originals" src={OriginalIcon} alt="home"/>
           <span>ORIGINALS</span>

       </a>
       <a href='/movies'>
           <img key="movies" src={MovieIcon} alt="home"/>
           <span>MOVIES</span>

       </a>
       <a href='/series'>
           <img key="series" src={SeriesIcon} alt="home"/>
           <span>SERIES</span>

       </a>
   </NavMenu>
   <SignOut>
   {userPhoto?<UserImg key="userPhoto" src={userPhoto} alt="user"/>:''}
   <DropDown>
    <span onClick={handleAuth}>Sign Out</span>
   </DropDown>
   </SignOut>
   </>
    :<LoginB onClick={(e)=>handleAuth(e)}>Login</LoginB>}
   </Nav>
  )
}
