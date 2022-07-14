import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Container=styled.div`
margin-top: 30px;
padding: 30px 0px 26px;
display: grid;
grid-gap: 25px;
grid-template-columns: repeat(${p=>p.colCount},minmax(0,1fr));

@media (max-width:768px){
    grid-template-columns: repeat(${p=>p.colCountSmall},minmax(0,1fr));
}
`;

const Wrap=styled.div`
padding-top: 56.25%;
border-radius: 10px;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
cursor: pointer;
overflow: hidden;
position: relative;
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
border: 3px solid rgba(249,249,249,0.1);

img{
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
}
video{
    height: 100%;
    width: 100%;
    position: absolute;
    top:0px;
    opacity: 0;
    z-index: 0;
}

&:hover{
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
transform:scale(1.05);
border-color: rgb(249,249,249,0.8);
video{
    opacity: 1;
}
    }
`;


function CardView(props) {
  return (
    <div style={{padding:'0px 0px 26px'}}>
         { props.title?<h4>{props.title}</h4>:''}
    <Container colCount={props.colCount} colCountSmall={props.colCountSmall}>
        {          
            props.movies.filter(m=>m.type===props.type).map((m,index)=>
                <Wrap key={index}>
                    <Link dis to={props.title?'/detail/'+m.id:'/home'}>
                    <img src={m.cardImg} alt=""/>
                    { props.videoEnabled?
                    <video autoPlay={true} loop={true} playsInline={true}>
                    <source src={m.video} type="video/mp4"/>
                    </video> :''}
                    </Link>
                </Wrap>
            )
        }

        </Container>
        </div>
  )
}

export default CardView;
