// import React from 'react'
import styled from 'styled-components';


import React, { useState } from 'react'
import axios from 'axios';
import OrderItems from '../client/OrderItems';
import { H1 } from '../../components/Navbar/NavbarElements';
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.res = [];
    this.getData = this.getData.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.displayActive = [];
    this.displayCompleted = [];
    this.getData();

    this.state = {

      screenActive: this.displayActive,
      screenComplete: this.displayCompleted,

    }
      setInterval(() => {

       this.updateActive();
      
     }, 10000);

  }
  async updateActive(){
    var req = window.location.search.split("?id=");

    let res = await axios("http://localhost:8080/orders/orders/user/orders", {
      params: { id: req[1] },
      method: "GET"

    });

    if(this.res.pending.length===res.data.pending.length && this.res["In-Progress"].length===res.data["In-Progress"].length  ){
      
    }else{
    
      this.displayActive=[];
      console.log(this.displayActive)
       
      
      this.res.pending=res.data.pending;
      this.res["In-Progress"]=res.data["In-Progress"]
      setTimeout(()=>{
        this.setState({screenActive:[]});
      },400);
      
      Object.entries(res.data).forEach(entry => {
      const [key, value] = entry;
      if (key === "pending" || key === "In-Progress") {
        for (let j = 0; j < value.length; j++) {

          let orderItem = {
            id: value[j]._id,
            name: value[j].restaurant_name,
            items: value[j].items,
            total: value[j].total,
            date: value[j].date,
    
            status: value[j].order_status
          }
          console.log(orderItem);
          this.displayActive.push(<OrderItems type="Client" item={orderItem} ></OrderItems>);
          setTimeout(() => {
            
            this.setState({ screenActive: this.displayActive });
          }, 400);
   

        }
        
      }})
    }
    
    if(this.res.completed.length===res.data.completed.length){
      
    }else{
      this.res.completed =res.data.completed;
      this.displayCompleted=[];
      
      this.displayActive=[];
      setTimeout(()=>{
        this.setState({screenComplete:[]});
        this.setState({screenActive:[]});
      },400);
     
      
      Object.entries(res.data).forEach(entry => {
      const [key, value] = entry;
     
        
       if (key === "pending" || key === "In-Progress") {
        for (let j = 0; j < value.length; j++) {

          let orderItem = {
            id: value[j]._id,
            name: value[j].restaurant_name,
            items: value[j].items,
            total: value[j].total,
            date: value[j].date,
            status: value[j].order_status
          }
          this.displayActive.push(<OrderItems type="Client" item={orderItem} ></OrderItems>);
          setTimeout(() => {
            this.setState({ screenActive: this.displayActive });
          }, 400);
   

        }
      }else{
        for (let j = 0; j < value.length; j++) {

          let orderItem = {
            id: value[j]._id,
            name: value[j].restaurant_name,
            items: value[j].items,
            total: value[j].total,
            date: value[j].date,
            status: value[j].order_status
          }
          console.log(orderItem);
          this.displayCompleted.push(<OrderItems type="Client" item={orderItem}></OrderItems>);
          setTimeout(()=>{
            this.setState({screenComplete: this.displayCompleted});
          },400);
        }
         

        }
      
      })
    }
    

  }
  async getData() {

    var req = window.location.search.split("?id=");

    let res = await axios("http://localhost:8080/orders/orders/user/orders", {
      params: { id: req[1] },
      method: "get"

    });

    this.res = res.data;
    console.log(res.data);
    Object.entries(res.data).forEach(entry => {
      const [key, value] = entry;
      if (key === "pending" || key === "In-Progress") {
        for (let j = 0; j < value.length; j++) {

          let orderItem = {
            id: value[j]._id,
            name: value[j].restaurant_name,
            items: value[j].items,
            total: value[j].total,
            date: value[j].date,
            status: value[j].order_status
          }
          console.log(orderItem);
          this.displayActive.push(<OrderItems type="Client" item={orderItem} ></OrderItems>);
          setTimeout(() => {
            this.setState({ screenActive: this.displayActive });
          }, 400);
   

        }
      }else{
        for (let j = 0; j < value.length; j++) {

          let orderItem = {
            id: value[j]._id,
            name: value[j].restaurant_name,
            items: value[j].items,
            total: value[j].total,
            date: value[j].date,
            status: value[j].order_status
          }
          console.log(orderItem);
          this.displayCompleted.push(<OrderItems type="Client" item={orderItem}></OrderItems>);
          setTimeout(()=>{
            this.setState({screenComplete: this.displayCompleted});
          },400);
        }
         

        }
       
      // this.array.push(<CategoryCards category={value} restTypes={this.RestTypes} ></CategoryCards>)
    })

  }



  render() {
    const Main = styled.div`
    height:auto;

    position:relative;
    top:-19.5vw;
    padding:3vw;
   `
    return (
      <Main>
        <div>
          <br></br>
          <br></br>
          <H1 id="payH1">Active</H1>
          <br></br>
          {this.state.screenActive}

        </div>
        <br />
        <br />
        <br />
        <br />
        <div id="completed">
          <br></br>
          <br></br>
          <H1>Completed</H1>
          {this.state.screenComplete}
        </div>
      </Main>
    )
  }
}
export default Orders