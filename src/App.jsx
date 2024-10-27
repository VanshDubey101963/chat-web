import { useTheme } from '@mui/material/styles';
import { Box , Stack , Avatar , IconButton , Divider} from '@mui/material';
import { ChatList } from '../components/ChatList';
import { ChatCircleDots , UsersThree , Phone , Gear} from 'phosphor-react';

function App() {

  const theme = useTheme()

  const NavbarIcons = [
    {
     index : 0 ,
     icon : <ChatCircleDots/>,
    },

    {
      index : 1,
      icon : <UsersThree/>,
    },

    {
      index : 2,
      icon : <Phone/>
    },
  ]
  
  return (
    <>
    <Stack direction={'row'} m={1} gap={0.1}>
        <Box p={2} sx={{backgroundColor: '#EEF3FA' ,height: "95vh",  boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" ,width: 70, borderRadius: 1.5}}>
          <Stack direction={'column'} alignItems={'center'} gap={3}>
                <Avatar alt='' src='src/assets/app-icon.png' sx={{p:1, backgroundColor: '#0572F4'}} />
                {NavbarIcons.map( el => (
                     <IconButton key={el.index}>
                       {el.icon}
                    </IconButton>
                  ))}
                <Divider variant="middle" flexItem/>
                <IconButton><Gear/></IconButton>
          </Stack>
        </Box>
        <ChatList theme={theme}/>
      </Stack>
    </>
  )
}

export default App;