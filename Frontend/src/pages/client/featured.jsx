//displaying restuarants by featured cards 
//featured of type will extend into card of component restaurants
//if restaurant compnent is clicked extends into restaurant 
import React ,{useState,useEffect}from 'react'
import styled from 'styled-components';
import CategoryCards from './categoryCards';
import RestType from './restType';
import axios from 'axios';
import Restuarant from './restuarant';

class Featured extends React.Component {
    //array of set featured compnents with there object passed in 

    //set state of a string that controlls the data rendered

    //the featured components show off the start will have an onclick that will send back element
    //this string will then be passed to create an element of resturants (boxes) with that type 

    constructor(props) {
        super(props);
        this.array=[];
        this.state = {
            active: 'start',
            page:this.array
        }
        this.handleBackLanding = this.handleBackLanding.bind(this);
        this.createRestuarants =this.createRestuarants.bind(this);
        this.makeCategoryCards = this.makeCategoryCards.bind(this);
        this.RestTypes = this.RestTypes.bind(this);
        this.makeCategoryCards();
    }
    
    handleBackLanding(){
        this.setState({
            page:this.array
        })
    }
    
    RestTypes= (obj) =>{
        
        console.log("hello");
        this.setState({
            page:<RestType type={obj} handleBackLanding={this.handleBackLanding} createRestuarants={this.createRestuarants}></RestType>
        })
    }
    async makeCategoryCards(){
        
        let res = await axios("http://localhost:8080/restaurants/menuItems", {
            method: "get"
        });

        console.log(res.data);
        Object.entries(res.data).forEach(entry => {
            const [key, value] = entry;
            value.key = key;
            
            this.array.push(<CategoryCards category={value} restTypes={this.RestTypes} ></CategoryCards>)
        })
     
        // for (let index = 0; index < Object.keys(res.data).length; index++) {
        //     console.log(Object.values(res.data)[index]);
        //     res.data[index].key=Object.keys(res.data)[index];
        //     this.array.push(<CategoryCards category={res.data[index]} restTypes={this.RestTypes} ></CategoryCards>)
        // }
        this.setState({
            page:this.array
        })
       
        if(Object.keys(res.data).length===0){
            this.makeCategoryCards();
        }
    }
    createRestuarants=(obj,obj2)=>{
        this.setState({
            page:<Restuarant AddToCart={this.props.AddToCart} goback={obj2} rest={obj} restTypes={this.RestTypes}></Restuarant>
        })
    }
   
   
    render() {
       
       const Main = styled.div`
        height:auto;
 
        position:relative;
        top:-19.5vw;
        padding:3vw;
       `
        return(
            
            <Main>
                {this.state.page}
            </Main>
        )
    }
}
export default Featured
