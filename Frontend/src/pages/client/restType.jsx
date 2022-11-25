import React from 'react'
import RestTypeCard from './restTypeCard';
//change to react compnent to render the data fetched 
class RestType extends React.Component {
   //fetches forth how many by type then return a list of object then i slap then into it
   constructor(props){
    super(props);
    this.state={
      displayData:[]
    }
    
    this.getRestByCuisine = this.getRestByCuisine.bind(this)
    this.getRestByCuisine();
    //do fetch
    
   }
   
   getRestByCuisine(){
    console.log(this.props);
    for (let index = 0; index < this.props.type.length; index++) {
     console.log(this.props.type.key);
      const element = this.props.type[index];
      console.log(element)
      this.state.displayData.push(<RestTypeCard rest={element} goback={this.props.type} type={this.props.type.key} createRestuarants={this.props.createRestuarants}></RestTypeCard>);
     }
   }
  
    //reccieve names of resturants and bukld cards for all resturants link to the clicked type
  
   
   render(){
  return (
    <>
        <button class="button1" onClick={()=>this.props.handleBackLanding()}>Back</button>
        {this.state.displayData}
    </>
    
  )
   }
}

export default RestType