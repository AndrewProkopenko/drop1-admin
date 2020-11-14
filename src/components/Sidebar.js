import React from "react";
import {NavLink} from "react-router-dom";

import { ExpandLess, ExpandMore } from '@material-ui/icons'
import {List, ListItem, ListItemText, Collapse} from "@material-ui/core";

import data from '../data/database.json'

function Sidebar() {

    const [openComp, setOpenComp] = React.useState(false); 
    const [openLap, setOpenLap] = React.useState(false); 
    const [openMon, setOpenMon] = React.useState(false); 
    const [openPO, setOpenPO] = React.useState(false); 
    const [openMeta, setOpenMeta] =  React.useState(false);
 
    const handleClickMeta = () => {     setOpenMeta(!openMeta); };

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
                    </List>
                </Collapse>

                {/* meta */}
                <ListItem button onClick={handleClickMeta}>
                    <ListItemText primary="TITLE, DESCRIPTION " secondary={'Задать страницам мета-теги'} />
                    {openMeta ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMeta} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink exact to='/meta/main' >
                            <ListItem button >
                                <ListItemText primary={'Главная'} secondary={"path: /"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi' >
                            <ListItem button >
                                <ListItemText primary={'Услуги'} secondary={"path: /uslugi"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-garantiynyy-remont' >
                            <ListItem button   >
                                <ListItemText primary={'Гарантийный ремонт'} secondary={"path: /uslugi/garantiynyy-remont"} className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-kompyuterov' >
                            <ListItem button>
                                <ListItemText primary={'Ремонт компьютеров'} secondary={"path: /uslugi/remont-kompyuterov"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-noutbukov' >
                            <ListItem button>
                                <ListItemText primary={'Ремонт ноутбуков'} secondary={"path: /uslugi/remont-noutbukov"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-istochnikov-bespereboynogo-pitaniya-i-stabilizatorov-napryazheniya' >
                            <ListItem button  >
                                <ListItemText primary={'Ремонт источников бесперебойного питания и стабилизаторов напряжения'}
                                              secondary={"path: /uslugi/remont-istochnikov-bespereboynogo-pitaniya-i-stabilizatorov-napryazheniya"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-printerov-mfu-kopirov' >
                            <ListItem button  >
                                <ListItemText primary={'Ремонт принтеров, МФУ, копиров'} secondary={"path: /uslugi/remont-printerov-mfu-kopirov"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-remont-planshetov-i-smartfonov' >
                            <ListItem button >
                                <ListItemText primary={'Ремонт планшетов и смартфонов'} secondary={"path: /uslugi/remont-planshetov-i-smartfonov"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/uslugi-platnyy-remont' >
                            <ListItem button   >
                                <ListItemText primary={'Платный ремонт'} secondary={"path: /uslugi/platnyy-remont"}  className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/price' >
                            <ListItem button >
                                <ListItemText primary={'Цены'} secondary={"path: /price"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/o-nas' >
                            <ListItem button >
                                <ListItemText primary={'О нас'} secondary={"path: /o-nas "} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/o-nas-garantiynoye-obsluzhivaniye' >
                            <ListItem button >
                                <ListItemText primary={'Гарантийное обслуживание'} secondary={"path: /garantiynoye-obsluzhivaniye"} className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/o-nas-nashi-vendory' >
                            <ListItem button >
                                <ListItemText primary={'Наши авторизации'} secondary={"path: /nashi-vendory"} className={'pl-5'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/novosti' >
                            <ListItem button >
                                <ListItemText primary={'Новости'} secondary={"path: /novosti"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/otzyvy' >
                            <ListItem button >
                                <ListItemText primary={'Отзывы'} secondary={"path: /otzyvy"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>
                        <NavLink exact to='/meta/kontakty' >
                            <ListItem button >
                                <ListItemText primary={'Контакты'} secondary={"path: /kontakty"} className={'pl-3'}/>
                            </ListItem>
                        </NavLink>

                    </List>
                </Collapse>   

              
        </List> 

    )
}

export default Sidebar