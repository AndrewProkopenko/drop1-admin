import React from 'react'

import HomeList from "./HomeList" 
 

import {
    Divider, 

} from '@material-ui/core';
  
function Home() {

    document.title = "Главная" 

    return (
            <div> 
                {/* преимущества */}  
                <HomeList/>
                
                <Divider/>
 
            </div>
    )
}

export default Home
