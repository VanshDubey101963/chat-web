// import { useTheme } from '@mui/material/styles';
// import { Stack } from '@mui/material';
// import { ChatList } from './components/ChatList';
// import Navbar from './components/Navbar';
import Login from './components/Login';


function App() {

  // const theme = useTheme() 
  
  return (
    <>
    {/* <Stack direction={'row'} m={1} gap={0.1}>
        <Navbar/>
        <ChatList theme={theme}/>
      </Stack> */}
      <Login/>
    </>
  )
}

export default App;