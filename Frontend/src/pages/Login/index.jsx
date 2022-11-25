import React, { useState } from "react";
import styled from "styled-components";
import SignInForm  from "./signinForm";
import { motion } from "framer-motion";
import { AccountContext } from "./AccountContext";
import {SignupForm } from "./signupForm";
import Navbar from "../../components/Navbar/index";
import "../../App.css"
import {UserIcon,UserLoginBox,UserLoginIcon} from "./LoginElements"


const BoxContainer = styled(motion.div)`
  background:#007fff;
  
  ${props => {
    if (props.toggle==='start') {
      return `
      animation: signin 1s;
      padding-top:3vw;
      width: 30rem;
      height:30rem;
      display: flex;
      flex-direction: column;
      border-radius: 19px;
      border:1px solid  #fff;;
      box-shadow: 0 8px 6px -6px #000;
      position: absolute;
      left:14rem;
      overflow: hidden;
      top:12vw;
      transition:.7s;
      opacity:1;
     
     
     
      `;
    }
    if (props.toggle==='signin') {
      return `
      animation: signin 1s;
      padding-top:3vw;
      width: 30rem;
      height:30rem;
      display: flex;
      flex-direction: column;
      border-radius: 19px;
      border:1px solid  #fff;;
      box-shadow: 0 8px 6px -6px #000; 
      position: absolute;
      left:14rem;
      overflow: hidden;
      top:12vw;
      transition:.7s;
      opacity:1;
     
     
      `;
    } else {
      return `
        animation: signup .9s ;
        width: 30rem;
        height:43rem;
        display: flex;
        border-radius: 19px;
        border:1px solid #fff;
        box-shadow: 0 8px 6px -6px #000;
        position: absolute;
        left:65vw;    
        overflow: hidden;
        top:14%;
        transition:.7s;
      `;
    }
  }}
`;




const Landing = styled.div`
    background-color:#17244d;
    //background:url(https://wallpaperaccess.com/full/3112895.jpg);
    opacity;.8;
    height:100%;
    position:fixed;
    top:0;
    width:100%;
    background-size:cover;
    background-repeat:no-repeat;
`


const InnerContainer = styled.div`
  width: 100%;
  display: flex;
    opacity:1;
    overflow:hidden!important;
    transiiton:1s;
  ${props => {
    if (props.toggle==='start') {
      return(`
      align-items:center;
      animation:fade 1s;
      opacity:1;
      `)
     }
    if (props.toggle==='signup') {
     return(`
     align-items:center;
     animation:fade2 1s  ;
     opacity:1;
     `)
    }else{
      return(`
      align-items:center;
      animation:fade 1s ;
      opacity:1;
     `)

    }
    
  }}
    
 
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("start");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  var x = {active:'start',html:<SignInForm/>};
  
  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider  value={contextValue}>
        <Navbar>
        </Navbar>
        <Landing></Landing>
      <UserLoginBox>
          <UserLoginIcon toggle={active} />
      </UserLoginBox>
      <UserIcon toggle={active} />
      <BoxContainer toggle={active}>
        <InnerContainer toggle={active}>
          {active ===x.active&& x.html}
          {active === "signin" && <SignInForm />}
          {active === "signup" && <SignupForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
