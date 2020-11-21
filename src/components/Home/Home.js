import React from 'react'

import HomeList from "./HomeList" 

import ElementCreator from '../../ElementCreator'

import {
    Divider, 

} from '@material-ui/core';
  
function Home() {

    document.title = "Главная" 

    return (
            <div> 
                {/* преимущества */}

                <ElementCreator/>

                <HomeList/>
                
                <Divider/>
 
            </div>
    )
}

export default Home
