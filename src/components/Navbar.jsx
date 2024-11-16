import { ChatCircleDots , UsersThree , Phone , Gear , SunDim} from 'phosphor-react';
import { Box , Stack , Avatar , IconButton , Divider} from '@mui/material';
import { faker } from '@faker-js/faker';

const Navbar = () => {

  
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
    <Box p={2} sx={{backgroundColor: '#EEF3FA' ,boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" ,width: 60, borderRadius: 1.5}}>
          <Stack direction={'column'} height={'100%'} alignItems={'center'} justifyContent={'space-between'} >
                <Stack gap={3}>
                    <Avatar alt='' src='src/assets/app-icon.png' sx={{p:1, backgroundColor: '#0572F4'}} />
                    {NavbarIcons.map( el => (
                        <IconButton key={el.index}>
                        {el.icon}
                        </IconButton>
                    ))}
                    <Divider variant="middle" flexItem/>
                    <IconButton><Gear/></IconButton>
                </Stack>
                
                <Stack direction={'column'} alignItems={'center'} gap={3}>
                    <IconButton><SunDim/></IconButton>
                    <IconButton ><Avatar alt='' src={faker.image.avatar()} sx={{width: 25, height: 25 }}/></IconButton>
                </Stack>

          </Stack>
        </Box>
  )
}

export default Navbar