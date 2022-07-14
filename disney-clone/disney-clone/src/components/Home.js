import React, { useEffect } from 'react'
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import CardView from './CardView';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName } from '../features/user/userSlice';
import db, { queryData } from '../firebase';
import { selectMovies, setMovies } from '../features/movie/movieSlice';
import { selectLogin } from '../features/login/loginSlice';
import { useNavigate } from 'react-router-dom';


const Container=styled.main`
position: relative;
min-height: calc(100vh-250px);
overflow-x: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw + 5px);

&:after{
    background: url('images/home-background.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
}
`;

const moviesJson=  [
    {
        cardImg:"images/viewers-disney.png",
        video:"videos/1564674844-disney.mp4"
    },
    {
        cardImg:"images/viewers-pixar.png",
        video:"videos/1564676714-pixar.mp4"
    },
    {
        cardImg:"images/viewers-marvel.png",
        video:"videos/1564676115-marvel.mp4"
    },
    {
        cardImg:"images/viewers-starwars.png",
        video:"videos/1608229455-star-wars.mp4"
    },
    {
        cardImg:"images/viewers-national.png",
        video:"videos/1564676296-national-geographic.mp4"
    },

];
function Home(props) {
 
    const login=useSelector(selectLogin);
    const navigate=useNavigate();
    useEffect(()=>{
      if(login){
        navigate('/home');
      }else{
        navigate('/');
      }
    },[login]);

  const dispatch=useDispatch();
  const username=useSelector(selectUserName);
  const movies=useSelector(selectMovies);
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