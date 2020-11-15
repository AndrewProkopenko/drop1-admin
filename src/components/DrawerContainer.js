import React from 'react';  
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button'; 
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import Sidebar from "./Sidebar"; 
 

export default function TemporaryDrawer() { 
  const [state, setState] = React.useState({ 
    left: false, 
  });

  const toggleDrawer = (anchor, open) => (event) => { 
    setState({ ...state, [anchor]: open });
  };
 
  const list = (anchor) => (
    <div 
      className='sidebar'
      role="presentation"
      // onClick={toggleDrawer(anchor, false)} 
    >
      
      <Sidebar />
    </div>
  );

  return (
    <React.Fragment>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton 
              aria-label="add an alarm" 
              onClick={toggleDrawer(anchor, true) }
              // variant="contained"
              size='medium'
              color={"primary"}
              startIcon={<MenuIcon/>}
              className={'sidebar-btn'}
          >  <MenuIcon fontSize='large'/>
          </IconButton>
            
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </React.Fragment> 
  );
}
 