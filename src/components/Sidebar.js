import React from "react";
// import axios from '../libs/axios'
import axios from 'axios'
import {NavLink} from "react-router-dom";

import { ExpandLess, ExpandMore } from '@material-ui/icons'
import {List, ListItem, ListItemText, Collapse} from "@material-ui/core";

import data from '../data/database.json'

function Sidebar() {

    const [openComp, setOpenComp] = React.useState(false); 
    const [openLap, setOpenLap] = React.useState(false); 
    const [openMon, setOpenMon] = React.useState(false); 
    const [openPO, setOpenPO] = React.useState(false);  
  

    // React.useEffect(() => {  
    //     fetchSidebarData()
    // }, []); 

    // function fetchSidebarData() {
    //     axios.get('http://localhost:4545/')
    //     .then(
    //         response => { 
    //             console.log(response)  
    //         }
    //     ) 
    // }
 
    return (
 
        <List >
 


            <NavLink exact to='/'>
                <ListItem button>
                    <ListItemText primary={'Главная '}/>
                </ListItem>
            </NavLink>  
            
            {/* contacts */}
            <NavLink exact to='/content/pages/contacts'>
                <ListItem button>
                    <ListItemText primary={'Контакты'}/>
                </ListItem>
            </NavLink>
            

                {/* 1 */}
               <ListItem button onClick={() => { setOpenComp(!openComp); }}>
                    <ListItemText primary="Ремонт компьютеров" secondary={"Наполнение страниц"} />
                    {openComp ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openComp} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink exact to='/content/pages/remont-kompyutepov'>
                            <ListItem button>
                                <ListItemText primary={'Ремонт компьютеров - Главная'} className={'pl-3'} />
                            </ListItem>
                        </NavLink> 
                        {
                            data['remont-kompyutepov']['list-service-menu'].map( (item) => (
                                <NavLink key={item.id} exact to={`/content/inner-pages/remont-kompyutepov/${item.slug}`}>
                                    <ListItem button>
                                        <ListItemText primary={item.title} className={'pl-3'} />
                                    </ListItem>
                                </NavLink> 
                            ))
                        }
                         
                    </List>
                </Collapse>

                {/* 2 */}
               <ListItem button onClick={() => { setOpenLap(!openLap); }}>
                    <ListItemText primary="Ремонт ноутбуков" secondary={"Наполнение страниц"} />
                    {openLap ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openLap} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink exact to='/content/pages/remont-noutbukov'>
                            <ListItem button>
                                <ListItemText primary={'Ремонт ноутбуков - Главная '} className={'pl-3'}  />
                            </ListItem>
                        </NavLink>
                        {
                            data['remont-noutbukov']['list-service-menu'].map( (item) => (
                                <NavLink key={item.id} exact to={`/content/inner-pages/remont-noutbukov/${item.slug}`}>
                                    <ListItem button>
                                        <ListItemText primary={item.title} className={'pl-3'} />
                                    </ListItem>
                                </NavLink> 
                            ))
                        }
                        {
                            data['remont-noutbukov']['list-brands-menu'].map( (item) => (
                                <NavLink key={item.id} exact to={`/content/inner-pages/remont-noutbukov/${item.slug}`}>
                                    <ListItem button>
                                        <ListItemText primary={item.title} className={'pl-3'} />
                                    </ListItem>
                                </NavLink> 
                            ))
                        }
                    </List>
                </Collapse>

                {/* 3 */}
               <ListItem button onClick={() => { setOpenMon(!openMon); }}>
                    <ListItemText primary="Ремонт мониторов" secondary={"Наполнение страниц"} />
                    {openMon ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMon} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink exact to='/content/pages/remont-monitorov'>
                            <ListItem button>
                                <ListItemText primary={'Ремонт мониторов - Главная '} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        {
                            data['remont-monitorov']['list-service-menu'].map( (item) => (
                                <NavLink key={item.id} exact to={`/content/inner-pages/remont-monitorov/${item.slug}`}>
                                    <ListItem button>
                                        <ListItemText primary={item.title} className={'pl-3'} />
                                    </ListItem>
                                </NavLink>
                            ))
                        }
                    </List>
                </Collapse>

                {/* 4 */}
               <ListItem button onClick={() => { setOpenPO(!openPO); }}>
                    <ListItemText primary="Настройка ПО" secondary={"Наполнение страниц"} />
                    {openPO ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openPO} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding> 
                        <NavLink exact to='/content/pages/nastrojka-po'>
                            <ListItem button>
                                <ListItemText primary={'Настройка ПО - Главная '} className={'pl-3'} />
                            </ListItem>
                        </NavLink>
                        {
                            data['nastrojka-po']['list-service-menu'].map( (item) => (
                                <NavLink key={item.id} exact to={`/content/inner-pages/nastrojka-po/${item.slug}`}>
                                    <ListItem button>
                                        <ListItemText primary={item.title} className={'pl-3'} />
                                    </ListItem>
                                </NavLink>
                            ))
                        }
                    </List>
                </Collapse>

                
              
        </List> 

    )
}

export default Sidebar