import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import db, { queryData, queryDoc } from '../firebase';
import IconBlack from '../assets/images/play-icon-black.png';
import IconWhite from '../assets/images/play-icon-white.png';
import GroupIcon from '../assets/images/group-icon.png';
import { useSelector } from 'react-redux';
import { selectLogin } from '../features/login/loginSlice';

function Detail(props) {
   const {id}=useParams();
   const [detailData,setDetailData]=useState({});
   const loggedIn=useSelector(selectLogin);
   const navigate=useNavigate();
  
   useEffect(()=>{
    if(!loggedIn){
        navigate('/');
    }
    queryDoc(db,"movies").then(res=>{
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
            <img key="pib" src={IconBlack} alt=""/>
            <span>Play</span>
           </Player>
           <Trailer>
            <img key="piw" src={IconWhite} alt=""/>
            <span>Trailer</span>
           </Trailer>
           <AddList>
            <span/>
            <span/>
           </AddList>
           <GroupWatch>
            <div>
                <img src={GroupIcon} alt=""/>
            </div>
           </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
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

const GroupWatch=styled.div`
height:44px;
width:44px;
border-radius: 50%;
display: flex;
justify-content:center;
align-items:center;
cursor:pointer;
background:white;

div{
    height: 40px;
    width: 40px;
    background: rgb(0,0,0);
    border-radius: 50%;

    img{
        width:100%;
    }
}

`;


const SubTitle=styled.div`
color:rgb(249,249,249);
font-size: 15px;
min-height: 20px;

@media (max-width:768px){
    font-size:12px;
}
`;

const Description=styled.div`
line-height:1.4;
font-size:20px;
padding:16px 0px;
color:rgb(249,249,249);

@media (max-width:768px){
    font-size:14px;
}
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

    &:nth-child(2){
        height:16px;
        transform: translateX(-8px) rotate(0deg);
        width:2px;
    }
}
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
const Trailer=styled(Player)`
background: rgba(0,0,0,0.3);
border: 1px solid rgb(249,249,249);
color: rgb(249,249,249);

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