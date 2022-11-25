import React from 'react'
import styled from 'styled-components';
const CategoryCards = (props) => {
    const H1 = styled.h1`
        font-weight:150;
        font-size:4vw;
        background-color:#000;
        color:#007fff;
        transition:0.7s;
       

    `
    const CategoryBox= styled.div`
        border-radius:2vw;
        background-color:#000!important;
        box-shadow:.1vw .1vw .1vw #000;
        height:28vw;
        width:40%;
        position:relative;
        float:left;
        left:3vw;
        top:3vw;
        margin:3vw;
        transition:0.7s;
        cursor: pointer;
        &:hover{
           
            
            color:#fff;
            
            border-radius: 2rem;
           
            
        }
        &:hover>h1{
            background-color:#000;
           
            color:#fff;
            
            
        }
        ${props => {
            switch(props.toggle){
                case('Chinese'):
                return`
                    background:url(https://blogs.voanews.com/all-about-america/files/2015/05/3880601807_db6e694911_b.jpg);
                    background-size:contain;
                    
                    background-repeat:no-repeat
                `
                case('Mexican'):
                return`
                    background:url(https://www.nhmagazine.com/content/uploads/2022/04/o/z/mexicanrestaurant-1024x683.jpg);
                    background-size:contain;
                  
                    background-repeat:no-repeat

                `
                case('Italian'):
                return`
                    background:url(https://www.eatthis.com/wp-content/uploads/sites/4/2021/02/italian-food.jpg?quality=82&strip=1);
                    background-size:contain;
                    background-position-y:-2vw;
                    
                    background-repeat:no-repeat
                `
                case('Greek'):
                return`
                    background:url(https://fravel.co/wp-content/uploads/2021/06/traditional-greek-food.jpeg);
                    background-size:contain;
                    
                    background-position-y:.7vw;
                    background-repeat:no-repeat
                `
                case('Indian'):
                return`
                    background:url(https://www.thecoldwire.com/wp-content/uploads/2020/11/selection-of-indian-food.jpg);
                    background-size:contain;
                   
                    background-position-y:1vw;
                    background-repeat:no-repeat
                `
                case('American'):
                return`
                    background:url(https://media.istockphoto.com/photos/picnic-table-to-celebrate-4th-of-july-picture-id683746270?k=20&m=683746270&s=170667a&w=0&h=DD0JEGLVrq0ljqyVYX3calwv_bIOpX7958_kuNCgWRU=);
                    background-size:contain;
                    background-position-y:1vw;
                 
                    background-repeat:no-repeat
                `
                case('Japanese'):
                return`
                    background:url(https://www.japanrailpass.com.au/wp-content/uploads/2016/04/1000x667xSushi.jpg.pagespeed.ic.4eZExgXXi0.jpg);
                    background-size:contain;
                    background-position-y:1.2vw;
                  
                    background-repeat:no-repeat
                `
            }
            
            
            
          
          }
          }
         
    `
    console.log(props.category)
    return (
      
        <>
            <CategoryBox onClick={()=>props.restTypes(props.category)} toggle={props.category.key} >

                <H1>{props.category.key}</H1>
            </CategoryBox>

        </>

    )
}

export default CategoryCards