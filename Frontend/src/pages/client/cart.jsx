import React, { useState } from 'react'
import styled from 'styled-components';
import RestItems from './restItems';
import './client.css'
import axios from 'axios';
const Cart = (props) => {

    const displayItems = [];
    const passThrough = (obj, qty) => {
        var cart = props.EditItemQty(obj, qty);
        document.getElementById("total").innerHTML = "Total: " + cart.total;
    }
    const delItems = (obj) => {


        let newCart = props.delFromCart(obj);

        console.log(newCart)
        document.getElementById("total").innerHTML = "Total: " + newCart.total;

        document.getElementById(obj).remove();
        console.log(document.getElementById(obj));
        console.log(document.getElementById('content'));
        //now ereases it in backend and update the total

    }

    function run(array, stack) {

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            stack.push(<RestItems type="cart" index={index} delItems={delItems} EditItemQty={passThrough} menuItem={element}></RestItems>);

        }

    }
    run(props.cart.items, displayItems);
    async function completeOrder(e) {
        console.log(props.cart)

        // var req = window.location.search.split("?id=");
        // console.log(req[1]);
        let res = await axios("http://localhost:8080/orders/orders", {
            method: "POST",
            data: props.cart
        });
       
        
            props.switchClient(e, "orders")
            props.clearCart();
       
        
   

}
//remove item by index when they decide to
const Main = styled.div`
       margin:2vw;
        height:auto;
        position:relative;
        top:-19.5vw;
        padding:3vw;
        border-radius:1vw;
        ${props => {
            if(props.toggle==="cart"){
                return`
                background:#007fff; 
                `
            }else{
                return`
                
                `
            }
        }}
       `
let today = new Date().toISOString().slice(0, 10)


const [view, setView] = useState("cart");
return (

    <Main toggle={view}>
        {view === "cart" && <>
            <div id="total">Total: {props.cart.total}</div>
            <div id="content">{displayItems}</div>

            <button class="button2" onClick={() => {
                console.log(props.cart);
                if (props.cart.items.length !== 0) {
                    setView("Pay")
                }else{
                    window.alert("no items")
                }}}>Place Order</button>
        </>}
        {view === "Pay" && <>

            <div id="payForm">
                <h1 id="payH1">Payment</h1>
                <form id="pay">
                    <input  placeholder="Card owner Name"></input>
                    <input placeholder="Card Number"></input>
                    <input min={today} type="date"></input>
                    <input placeholder="CVV"></input>

                </form>
                <br></br>
                <br></br>
                <button class="button2" onClick={(e) => completeOrder(e)}>Submit Payment</button>
                <button class="button1" onClick={() => setView("cart")}>Back</button>

            </div>
        </>}



    </Main>

)
}

export default Cart