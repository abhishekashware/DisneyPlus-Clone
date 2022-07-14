import React, { useEffect } from 'react'
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import CardView from './CardView';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, setUserLoginDetails } from '../features/user/userSlice';
import db, { auth, queryData } from '../firebase';
import { selectMovies, setMovies } from '../features/movie/movieSlice';
import { selectLogin, setLogin } from '../features/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import DisneyViewers from '../assets/images/viewers-disney.png';
import PixarViewers from '../assets/images/viewers-pixar.png';
import SWViewers from '../assets/images/viewers-starwars.png';
import MarvelViewers from '../assets/images/viewers-marvel.png';

import NationalViewers from '../assets/images/viewers-national.png';
import VD from "../assets/videos/1564674844-disney.mp4";
import VP from "../assets/videos/1564676714-pixar.mp4";
import VM from "../assets/videos/1564676115-marvel.mp4";
import VSW from "../assets/videos/1608229455-star-wars.mp4";
import VNV from "../assets/videos/1564676296-national-geographic.mp4";

const Container=styled.main`
position: relative;
min-height: calc(100vh-250px);
overflow-x: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw + 5px);

&:after{
    background: url('home-background.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
}
`;

const moviesJson=  [
    {
        cardImg:DisneyViewers,
        video:VD
    },
    {
        cardImg:PixarViewers,
        video:VP
    },
    {
        cardImg:MarvelViewers,
        video:VM
    },
    {
        cardImg:SWViewers,
        video:VSW
    },
    {
        cardImg:NationalViewers,
        video:VNV
    },

];
function Home(props) {
 
    const login=useSelector(selectLogin);
    const navigate=useNavigate();
  
    const dispatch=useDispatch();
    const username=useSelector(selectUserName);
    const movies=useSelector(selectMovies);
  
    useEffect(()=>{
      if(!login){
        navigate('/');
      }else{
        navigate('/home');
        auth.onAuthStateChanged(async(user)=>{
            if(user){
                setLoggedIn(true);
                setUser(user);
                localStorage.setItem("isLoggedIn","true");
            }else{
              localStorage.clear();
              setLoggedIn(false);
              setUser(user);
              navigate('/');
            }
          });
      }
    },[login]);

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

  useEffect(()=>{
    queryData(db,"movies").then(data=>{
        dispatch(setMovies({movies:data.docs.map((d)=>{let t=d.data(); t.id=d.id; return t;})}));
    }).catch(err=>{
        alert(err.message);
    })
  
  },[username]);
  return (
   <Container>
    <ImgSlider/>
    <CardView movies={moviesJson} videoEnabled={true} colCountSmall={1} colCount={5}/>
    <CardView movies={movies} type="recommend" title="Recommended for you" videoEnabled={false} colCountSmall={2} colCount={4}/>
    <CardView movies={movies} type="trending" title="Trending" videoEnabled={false} colCountSmall={2} colCount={4}/>
    <CardView movies={movies} type="new" title="New to disney+" videoEnabled={false} colCountSmall={2} colCount={4}/>
    <CardView movies={movies} type="original" title="Originals" videoEnabled={false} colCountSmall={2} colCount={4}/>

   </Container>
  )
}

export default Home;