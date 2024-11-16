import { Stack , TextField} from '@mui/material'

const Login = () => {
  return (
    <div>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{width:'100%', height:'100vh'}}>
        <TextField
          id="outlined-multiline-flexible"
          label="Username"
          multiline
          maxRows={4}
        />
        </Stack>
    </div>
  )
}

export default Login