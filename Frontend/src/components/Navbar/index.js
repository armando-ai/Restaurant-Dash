import React, { useState } from 'react'
import { FaMail } from 'react-icons/fa';
import BusinessNav from './BusinessNav';
import ClientNav from './ClientNav';


import{Nav,NavBtnLink,NavBtn,NavMenu,NavLink,Bars,H1}from './NavbarElements'

import StartNav from './StartNav';
const Navbar = () => {
    const [active, setActive] = useState("start");
    var req =  window.location.href.toLowerCase();
   if(req.includes("/login")){
    setTimeout(() => {
        setActive("start");
      }, 400);
   } else if(req.includes("/business?type=business")){
    setTimeout(() => {
        setActive("business");
      }, 400);
   }
   else if(req.includes("/client") || req.includes("/client?type=businessclient")){
    setTimeout(() => {
        setActive("client");
      }, 400);
   }
   // here i will dtermine who is active 
    
  return (
    < >
        <Nav toggle={active}>
            <NavMenu>
                {active === "start" && <StartNav/>}
                {active === "business" && <BusinessNav></BusinessNav>}
                {/* //in client all we will do is pass in a variables for the user type 
                //being busniessowner and it will have an extra NavLink */}
                {active === "client" && <ClientNav></ClientNav>}

            </NavMenu>
           
            {/* <NavLink to="/">
                <img src='.\.\logo.svg'></img>
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to="/menuitems" activeStyle>
                    Menu
                </NavLink>
                <NavLink to="/offers" activeStyle>
                    Offers
                </NavLink>
                <NavLink to="/ordertracking" activeStyle>
                    Orders
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/Login">Sign Out</NavBtnLink>
            </NavBtn> */}
        </Nav>
    </>
  )
}

export default Navbar