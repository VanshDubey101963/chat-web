import { useTheme } from '@mui/material/styles';
import { Box , Divider , Stack , Avatar} from '@mui/material';

function App() {

  const theme = useTheme()

  return (
    <>
      <Box p={2} sx={{backgroundColor: theme.palette.background.paper ,height: "100vh", boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" ,width: 70, borderRadius: 1.5}}>
        <Stack direction={'column'} alignItems={'center'}>
            <Avatar alt='' src='src/assets/app-icon.png' sx={{p:1, backgroundColor: '#0572F4'}} />
        </Stack>
      </Box>
      <Divider orientation='vertical'/>
    </>
  )
}

export default App
