import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Cart from './cart';
import './client.css'
import Featured from './featured';
import Orders from './Orders';
const Link = styled.div`
  font-size:1.5vw;
  margin-top:1vw;
  float:left;
  margin-left:2vw;
  color:#007fff;
  transition:0.6s;
  cursor:pointer;
  &:hover{
    color:#000;
  }
  
`
const Span = styled.span`
font-size:1.5vw;
margin-top:.9vw;
float:left;
margin-left:2vw;
`
const Menu = styled.div`
position:fixed;
top:0;
height:10vw;
width:25%;
z-index: 10;
left:5vw
text-a
`
const BigBox = styled.div`
  height:auto;
  width:100%;
  overflow-x:hidden;
`

const Content = styled.div`
position:absolute;
height:auto;
min-height:91.8%;
width:100%;
padding-top:20vw;
text-align:center;
 background:#17244d;
transition:1s;
top:4vw; 
overflow-y:unset;
`
const Total = styled.div`
  background:#000;
  color:$fff;
  height:5vw;
  width:5vw;
  margin:10vw auto;
`
const Client = () => {

  var req = new URLSearchParams(window.location.search).get('type');
  //get all items 
  const myContainer = useRef(null);
  const [active, setActive] = useState("home");
  const total = [];
  const [activeTotal, setActiveTotal] = useState({ name: 'unchanged' });
  const [animation, setAnimation] = useState("move");
  var req = window.location.search.split("?id=");

  const [user, setUser] = useState({
    //create function that will append and also delete by type 
    //token:URLSearchParams(window.location.search).get('token'),
    //figure out coupons 
    //mkae

    cart: {
      items: [],
      coupon: '',
      total: 0,
      restaurant_id: 0,
      order_status:"Pending",
      restaurant_name: "",
      user_id: req[1]
    }

  })
  //del from cart 
  function delFromCart(obj) {
    console.log(user.cart.items);
    const index = user.cart.items.findIndex((emp) => emp.dish_name === obj);
    console.log(obj);
    if (index !== -1) {
      user.cart.items.splice(index, 1);
    }

    return updateTotal();


  }
  function setRestCart(obj) {

    // user.cart.restaurant_id = obj.id;
    // console.log(user.cart.restaurant_id);

    // user.cart.restaurant_name = obj.name;
    // console.log(user.cart);

  }
  function AddToCart(obj) {

    //e.preventDefault();
    console.log(user.cart,obj);
    if (user.cart.restaurant_name === ""||user.cart.restaurant_name===obj.restaurant_name) {
      
      verifiedAddCart(obj);
    }else{
      
      clearCart();
      verifiedAddCart(obj);
    }

   
  }
  function verifiedAddCart(obj) {
    console.log(obj);
    user.cart.restaurant_id = obj.restaurant_id;
    user.cart.restaurant_name = obj.restaurant_name;

    delete obj.restuarant_name;
    delete obj.restaurant_id;
    const index = user.cart.items.findIndex((emp) => emp.dish_name === obj.dish_name);

    console.log(user.cart.items);
    if (index !== -1) {
      user.cart.items[index].quantity = user.cart.items[index].quantity + 1;

      
    } else {
      obj.quantity = 1;
      user.cart.items.push(obj);
      
    }
    updateTotal();
  }
  function EditItemQty(obj, qty) {

    //e.preventDefault();
    console.log(obj);
    const index = user.cart.items.findIndex((emp) => emp.name === obj.name);



    console.log(user.cart.items);
    if (index !== -1) {
      user.cart.items[index].quantity = qty * 1;

      console.log(user.cart.items[index]);
    }
    return updateTotal();



  }

  const updateTotal = () => {
    if (user.cart.coupon != '') {

    }
    var x = 0;
    for (let index = 0; index < user.cart.items.length; index++) {
      var element = user.cart.items[index].price * user.cart.items[index].quantity;

      x = x + element * 1.0;
      console.log(x)

    }
    user.cart.total = Number.parseFloat(x).toFixed(2) * 1.0;
    console.log(user.cart);
    return user.cart;
  }
  function clearCart() {
    user.cart = {
      items: [],
      coupon: '',
      total: 0,
      order_status:"Pending",
      restaurant_id: 0,
      restaurant_name: "",
      user_id: req[1]
    }
  }
  //window alert
  function switchClient(e, x) {
    if (animation === "move") {

      setTimeout(() => {
        setAnimation("movedown");
      }, 400);
    } else {
      setTimeout(() => {
        setAnimation("move");
      }, 400);


    }



    e.preventDefault();
    setTimeout(() => {
      setActive(x);
    }, 400);
  };

  var req = window.location.search.split("?id=");
  // console.log(req[1]);
  if (req[1] === undefined) {
    window.alert("Create An Account");
    window.location.href = "http://localhost:5000/login"
  }
  return (

    <>

      <Navbar />
      <Menu>
        <Link onClick={(e) => { switchClient(e, "home") }}>Home</Link>
        <Span>|</Span>
        <Link onClick={(e) => { switchClient(e, "orders") }}>Orders</Link>
        <Span>|</Span>
        <Link onClick={(e) => { switchClient(e, "cart") }}>Cart</Link>
        <Span>|</Span>
      </Menu>
      <Content className={active === 'home' || 'orders' || 'cart' || 'coupons' ? animation : ''} >
        {/* {active==="home" && <Featured></Featured>} */}
        {active === "home" && <Featured setRestCart={setRestCart} AddToCart={AddToCart}></Featured>}
        {active === "orders" && <Orders></Orders>}
        {active === "cart" &&

          <Cart clearCart={clearCart} delFromCart={delFromCart} EditItemQty={EditItemQty} switchClient={switchClient} cart={user.cart}></Cart>



        }


      </Content>
    </>



  )
}

export default Client