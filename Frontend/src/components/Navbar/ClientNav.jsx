import React ,{useState}from 'react'
import { FaUserLock } from 'react-icons/fa'
import styled from 'styled-components'
import { BoldLink, User } from '../../pages/Login/LoginElements'
const CLientDiv = styled.div`
    text-align:center;
`
const Link1 = styled.div`
  font-size:1.5vw;
  margin-top:1vw;
  position:absolute;
  z-index:10;
  left:33.5vw;
  cursor:pointer;
  transition:1s;
  &:hover{
    color:#000;
  }
`
const Link = styled.div`
  font-size:1.5vw;
  margin-top:1vw;
  position:absolute;
  z-index:10;
  left:25.5vw;
  cursor:pointer;
  transition:1s;
  &:hover{
    color:#000;
  }
`
const Span = styled.span`
font-size:1.5vw;
color:#000;
position:absolute;
left:32.2vw;
top:.9vw;
`
const ClientNav = () => {
  const [active, setActive] = useState("");
    var req =  window.location.href;
    
   if(req.includes("/client?type=businessclient")){
    setTimeout(() => {
        setActive("business");
      }, 40);
   }
   else if(req.includes("/client?type=client")  ){
    setTimeout(() => {
        setActive("client");
      }, 40);
   }
   var req = window.location.search.split("?id=");
        
  return (
    <>
    
    {/* <h1 style={{position: 'absolute',left:80+'%',top:25+'%'}} >UserName</h1> */}
    {active==="business" &&  <FaUserLock style={{position: 'absolute',left:90+'%',top:20+'%', fontSize:3+'rem'}}></FaUserLock>}
    {active==="business"&& <Link1><a  href={"http://localhost:3000/business?type=business?id="+req[1]}>Business View</a></Link1>}
    {active ==="client" && <User style={{position: 'absolute',left:90+'%',top:23+'%', fontSize:2.8+'rem'}}></User> }
    <Link ><a href={"http://localhost:3000/login"} >Sign Out</a></Link>
    <Span>|</Span>
    </>
    
    
  )
}

export default ClientNav