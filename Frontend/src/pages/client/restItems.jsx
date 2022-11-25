import React ,{useState}from 'react'
import styled from 'styled-components'

const RestItems = (props) => {
    const Item = styled.div`
    position:relative;
    top:2vw;
    height:auto;
    background:#17244d;
    padding:1vw;
    width:80%;
    font-weight:100!important;
    margin:0 auto;
    margin-bottom:2vw;
    border-radius:1vw;  
    transition:0.7s;
    color:#fff;  
    `
    
  return (
  <div id={"Dish"+props.menuItem.dish_name}>
 <Item id={props.menuItem.dish_name}>
            
            <h1>Dish Name:  {props.menuItem.dish_name}</h1>
            <br></br>
            <h1>Price:  {props.menuItem.price}</h1> 
            <br></br>
            {props.menuItem.order===true && <> 
            <h1 id="payH1">Qty: {props.menuItem.quantity}</h1></>}

            {props.type==="cart" &&  <div id="editqty"><li id="li-cart">Qty: </li> <input id="cart-input" type='number'  min="1" defaultValue={props.menuItem.quantity} onChange={(e)=>{props.EditItemQty(props.menuItem,e.target.value)
            }}></input> </div>}
            {props.type==="cart" && <button class="button1" onClick={(e)=>props.delItems(props.menuItem.dish_name)}>Remove</button>}
            
            {/* //add a proerty defining if it is resturant or cart 
            //one will show regular as seen below other will have 
            //qty displaying and update quantity */}
            {props.type==="restaurant" && <>{props.menuItem.available ===true && <button className="button1" onClick={(e)=>props.AddToCart(props.menuItem)}>Add To Cart</button>}{props.menuItem.available ===false && <h1>Unavailable</h1>} </>}
            {props.type==="Business" && <button className="button1"  onClick={(e)=> props.handlecallBack(props.menuItem)}>Edit Dish</button>}
            
        </Item>
  </div>
   
 
  
  )
}

export default RestItems