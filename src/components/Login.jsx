import {Stack} from '@mui/material'
import {useForm} from 'react-hook-form'

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
    const onSubmit = (data) => {
        console.log(data);
    }

  return (
    <div>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{width:'100%', height:'100vh'}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex' , flexDirection: 'column'}} >
            <input placeholder='Username' {...register("username", {required: true})} />
            {errors.username?.type == 'required' && <span style={{color: 'red' , font: 5}}> Username is required </span>}
            <input placeholder='Email' type="email" {...register("email", {required: true})} />
            {errors.email?.type == 'required' && <span style={{color: 'red' , font: 5}}> Email is required </span>}
            <input type="password" placeholder='Password' {...register("password", {required: true})} />
            {errors.password?.type == 'required' && <span style={{color: 'red' , font: 5}}> Password is required </span>}
            <button type='submit'>Sign up</button>
            </form>
        </Stack>
    </div>
  )
}

export default Login