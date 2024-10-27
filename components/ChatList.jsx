import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box , Avatar } from '@mui/material';

const ChatList = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <Box sx={{backgroundColor: props.theme.palette.background.paper , height: "95vh", width: 360 , borderRadius: 1.5 , outline: 'none'}}>
                
          <List>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            sx={{borderRadius: 1.5 , gap: 2}}
          >
            <ListItemIcon>
            <Avatar alt='' src='src/assets/app-icon.png' sx={{p:1, backgroundColor: '#0572F4'}} />
            </ListItemIcon>
            <ListItemText primary="Vansh Dubey" />
          </ListItemButton>
          </List>
        </Box>
  )
}

export { ChatList }