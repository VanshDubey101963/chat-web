import { useTheme } from '@mui/material/styles';
import { Box , Divider , Stack , Avatar , List , ListItemButton} from '@mui/material';
import { ChatList } from '../components/ChatList';
import { useState } from 'react';


function App() {

  const theme = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  return (
    <>
    <Stack direction={'row'}>
        <Box p={2} m={1} sx={{backgroundColor: theme.palette.background.paper ,height: "95vh",  boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" ,width: 70, borderRadius: 1.5}}>
          <Stack direction={'column'} alignItems={'center'} gap={3}>
              <List>
              <ListItemButton >
              <Avatar alt='' src='src/assets/app-icon.png' sx={{p:1, backgroundColor: '#0572F4'}} />
            </ListItemButton>
            <ListItemButton
                 selected={selectedIndex === 1}
                 onClick={(event) => handleListItemClick(event, 1)}
              >
              <Avatar alt='' src='src/assets/communication_13787501.png' sx={{p:1}}/>
            </ListItemButton> 
            <ListItemButton
                 selected={selectedIndex === 2}
                 onClick={(event) => handleListItemClick(event, 2)}
              >
              <Avatar alt='' src='src/assets/group_15804694.png' sx={{p:1}}/>
            </ListItemButton> 
            <ListItemButton
                 selected={selectedIndex === 3}
                 onClick={(event) => handleListItemClick(event, 3)}
              >
               <Avatar alt='' src='src/assets/telephone_14318132.png' sx={{p:1}}/>
            </ListItemButton>   
            
              </List>
          </Stack>
        </Box>
        <ChatList theme={theme}/>
      </Stack>
    </>
  )
}

export default App;