import React from 'react'
import { FaUserLock } from 'react-icons/fa'
import styled from 'styled-components'
import { BoldLink, User } from '../../pages/Login/LoginElements'
import { H1 } from './NavbarElements'
const Link = styled.div`
  font-size:1.8vw;
  margin-top:1vw;
  position:absolute;
  z-index:10;
  left:5.5vw;
  transition:1s;
  cursor:pointer;
  &:hover{
    color:#000;
  }
`
const Link1 = styled.div`
font-size:1.8vw;
margin-top:1vw;
position:absolute;
z-index:10;
left:16.5vw;
cursor:pointer;
transition:1s;
&:hover{
  color:#000;
}
`
const Span = styled.span`
font-size:1.5vw;
position:absolute;
left:15.2vw;
top:1.2vw;
`
const BusinessNav = () => {
  var req = window.location.search.split("?id=");
  return (
  < >
  
  {/* <h1 style={{position: 'absolute',left:80+'%',top:25+'%'}} >UserName</h1> */}
  <FaUserLock style={{position: 'absolute',left:90+'%',top:20+'%', fontSize:3+'rem'}}></FaUserLock>
  <Link ><a href={"http://localhost:3000/client?type=businessclient?id="+req[1]} >Client View</a></Link>
  <Span>|</Span>
  <Link1 ><a href={"http://localhost:3000/login"} >Sign Out</a></Link1>
  </>
   

    
  )
}

export default BusinessNav