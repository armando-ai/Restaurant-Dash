import React from 'react'
import styled from 'styled-components';
import RestItems from './restItems';
import axios from 'axios';
const OrderItems = (props) => {
    const Order = [];
    for (let index = 0; index < props.item.items.length; index++) {
        const element = props.item.items[index];
        element.order = true;
        Order.push(<RestItems menuItem={element}></RestItems>);
    }
    const OrderBox = styled.div`
        margin:5vw auto;
        margin-top:5%;
        height:auto;
        padding:2vw;
        width:80%;
        border-radius:3vw;
        background:#000;
    `

    var buttonvalue = '';
    if (props.item.status === "Pending") {
        buttonvalue = 'In-Progress'
    } else if (props.item.status === "In-Progress") {
        buttonvalue = 'Completed'
    }
    const updateOrder = () => {

        //document.getElementById(orderId).remove();
        var interval = setInterval(async () => {

            console.log(document.getElementById("orderBox" + props.item.id).remove());
            // props.updateOrder(("orderBox"+props.item.id));
            clearInterval(interval);
            console.log(props.item.id)

            let res = await axios("http://localhost:8080/orders/orders/update", {
                method: "PATCH",
                params: { id: props.item.id },
            });
           

        }, 400);
    }




    return (
        <div id={"orderBox" + props.item.id}>
            <OrderBox >
                {props.type === "Business" && <h1 id="payH1">Order Id:  {props.item.id}</h1>}
                {props.type === "Business1" && <h1 id="payH1">Order Id:  {props.item.id}</h1>}
                <br></br>
                <br></br>
                <h1 id="payH1" >Date:  {props.item.date}</h1>
               
                {props.type === "Client" && <div id={props.item.id} class="payH1">Order from {props.item.name} Status:  {props.item.status} <br></br> <h1>Order Id:  {props.item.id}</h1></div>}
                <br></br>
                {Order}
                <br></br>
                <div class="payH1">Total: {props.item.total}</div>
                <br></br>
                {props.type === "Business" && <button className="button1" onClick={(e) => updateOrder()}>Move To {buttonvalue}</button>}
            </OrderBox>
        </div>


    )
}

export default OrderItems