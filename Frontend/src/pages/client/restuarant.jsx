import React ,{useState} from 'react'
import styled from 'styled-components'
import { Content } from '../owner/invElements'
import RestItems from './restItems'

const Restuarant = (props) => {
  const RestuarantBox = styled.div
  `
  color:#fff;
  font-weight:100;
  font-size:2vw;
  height:10vw;
  width:80%;
  margin:0 auto;
  `
  const Landing = styled.div`
  
    height:50vw;
    width:100%;
  `
  const Content = styled.div`
    background-color:#fff;
    min-height:50vw;
    height:auto;
    padding-right:4vw;
    border-radius:1vw;
    border:1px solid #007fff;
    width:90%;
   margin:0 auto;
  `

  const[active,setActive]=useState("items");
 
  //const items =[{name:'2 Auntre and 1 Entree',price:12.99,cuisine:'Chinese'},{name:'Egg Rolls',price:1.99,cuisine:'Chinese'},{name:'Bowl',price:6.99,cuisine:'Chinese'},{name:'Fountain Drink',price:1.99}];
  // const coupons =[{}];
  console.log(props);
  const rawItems=[];
  const items =props.rest.menu_items
  console.log(props);
  for (let index = 0; index <items.length; index++) {
    const element = items[index];
    element.restaurant_name=props.rest.name;
    element.restaurant_id=props.rest.id; 
    console.log(props.rest,element);
    
      rawItems.push(<RestItems type="restaurant" AddToCart={props.AddToCart} menuItem={element}></RestItems>);
    
  }
 
  return (
    <>
    <button class="button1"onClick={()=>props.restTypes(props.goback)}>Back</button>
    <RestuarantBox>{props.rest.name}</RestuarantBox> 
    
    {/* <button onClick={()=>{setActive("coupons")}}>coupons</button> */}
    <Content>
      {rawItems}
    </Content>
    </>
    
  )
}

export default Restuarant