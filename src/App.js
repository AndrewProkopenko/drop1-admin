

import React from 'react'

import './App.scss'
import "./main.scss"

import axios from 'axios'

import {BrowserRouter as Router, useLocation} from 'react-router-dom'

import {
    Button,
    Container, 
    Grid, 
    Paper
} from '@material-ui/core';
 
import RouterComponent from "./RouterComponent";
import DrawerContainer from './components/DrawerContainer'

import ScroolToTop from './ScrollToTop'

import Login from "./Login"
 

function App() {  

    let [token, setToken] = React.useState(false)
     
    let tokenStor = localStorage.getItem('vice-app-token') || null
  
    React.useEffect(() => { 
        setToken(tokenStor)
    }, []);  

    function setLogin() {
        setToken(true)
    }
    function LogOut() {
        setToken(false)
    }
    
    return (

        <Router basename="/drop1-admin">
            <ScroolToTop/>   
                {
                    !token ? <Login setLogin={setLogin} /> : 
               
                    <Container className='main' maxWidth={'xl'}>
                        <DrawerContainer/>
                        <Grid container justify="flex-end">
                            <Button color="error" onClick={LogOut}>Выйти</Button>
                        </Grid>
                        <Grid container spacing={3} justify="flex-end"> 
                            {/* <Grid item xs={12} md={2} >
                                <Paper className='sidebar' elevation={3}>
                                    <Sidebar/> 
                                </Paper>
                            </Grid> */}
                            <Grid item xs={12} >
                                <Paper className='paper  ml-60 ' elevation={3}>
                                    <RouterComponent/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container> 
                }
        </Router>
    );
}

export default App;
