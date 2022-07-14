import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import db, { queryData, queryDoc } from '../firebase';

function Detail(props) {
   const {id}=useParams();
   const [detailData,setDetailData]=useState({});
  
   useEffect(()=>{
    queryDoc(db,"movies","1").then(res=>{
        res.docs.forEach(i=>{
            if(i.id==id){
                setDetailData(i.data());
            }
        })
    }).catch(err=>{
        console.log(err);
    })
   },[id]);
    return (
    <Container>
       <Background>
        <img src={detailData.backgroundImg} alt={detailData.title}/>
       </Background>

       <ImgTitle>
         <img src={detailData.titleImg} alt={detailData.title}/>
       </ImgTitle>
       <ContentMeta>
        <Controls>
           <Player>
            <img src="images/play-icon-black.png" alt=""/>
            <span>Play</span>
           </Player>
           <Trailer>
            <img src="images/play-icon-white.png" alt=""/>
            <span>Trailer</span>
           </Trailer>
           <AddList>
            <span/>
            <span/>
           </AddList>
        </Controls>
       </ContentMeta>
    </Container>

  )
}

const Container=styled.div`
position: relative;
min-height: calc(100vh-250px);
overflow-x: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw + 5px);
`;

const AddList=styled.div`
margin-right: 16px;
height: 44px;
width: 44px;
display: flex;
justify-content: center;
align-items: center;
background-color: rgb(0,0,0,0.6);
border-radius: 50%;
border: 2px solid white;
cursor: pointer;

span{
    background-color: rgb(249,249,249);
    display: inline-block;

    &:first-child{
        height: 2px;
        transform: translate(1px,0px) rotate(0deg);
        width: 16px;
    }

    //here
}
`;

const Trailer=styled.div`
background: rgba(0,0,0,0.3);
border: 1px solid rgb(249,249,249);
color: rgb(249,249,249);

`;
const Player=styled.div`

font-size: 15px;
margin: 0px 22px 0px 0px;
padding: 0px 24px;
height: 56px;
border-radius: 4px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
letter-spacing: 1.8px;
text-align: center;
text-transform: uppercase;
background-color: rgb(249,249,249);
border: none;
color: rgb(0,0,0);
img{
    width: 32px;
}

&:hover{
    background-color: rgb(198,198,198);

}

@media (max-width:768px){
    height: 45px;
    padding: 0px 22px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img{
        width: 25px;
    }
}
`;

const Background=styled.div`
 left: 0px;
 opacity: 0.8;
 position: fixed;
 right: 0px;
 top: 0px;
 z-index: -1;

 img{
    width: 100vw;
    height: 100vh;

    @media (max-width:768px){
        width: initial;
    }
 }

`;

const ContentMeta=styled.div`
max-width: 874px;
`;

const Controls=styled.div`
align-items: center;
display: flex;
flex-grow: row nowrap;
margin: 24px 0px;
min-height: 56px;
`;
const ImgTitle=styled.div`
align-items: flex-end;
display: flex;
-webkit-box-pack: start;
justify-content: flex-start;
margin: 0px auto;
height: 30vw;
min-height: 170px;
padding-bottom: 24px;
width: 100%;

img{
    max-width: 600px;
}

`;

export default Detail