import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';;
import { useNavigate } from 'react-router-dom';

import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import {login} from '../../services/authService'
import { AxiosResponse } from 'axios';

const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Invalid Email format').required('Email is required'),
        password: Yup.string().required('Password is required')
    }
)

function Copyright(props: any) {
   return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
  
const theme = createTheme();

const LoginForm = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

    };

    const initialCredentials = {
        email: '',
        password: ''
    }

    let navigate = useNavigate();

    

    return (
            <ThemeProvider theme={theme}>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={async(values) => {
                    login(values.email, values.password).then(async(response: AxiosResponse) => {
                        if(response.status === 200) {
                            if(response.data.token){
                                alert(JSON.stringify(values, null, 2));
                                sessionStorage.setItem('sessionJWTToken', response.data.token);
                                navigate('/');
                            }else{
                                throw new Error('Invalid Token')    
                            }
                        }else{
                            throw new Error('Invalid Credentials')
                        }
                    }).catch((error) => console.log(`[Login Error]: Somethind went wrong: ${error}`))

                }}
            >
                {
                    ({values, touched, errors, isSubmitting, handleChange, handleBlur}) =>
                    (
                        <Form>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                helperText="Incorrect entry."
                                />
                                {
                                    errors.email && touched.email && (
                                        <ErrorMessage name='email' component='div'></ErrorMessage>
                                    )
                                }
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                />

                                {
                                    errors.password && touched.password && (
                                        <ErrorMessage name='password' component='div'></ErrorMessage>
                                    )
                                }
                                <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                />
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Sign In
                                </Button>
                                {
                                    isSubmitting ? (<p>Checking credentials...</p>) : null
                                }
                                <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                    Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                                </Grid>
                            </Box>
                            </Box>
                            <Copyright sx={{ mt: 8, mb: 4 }} />
                        </Container>
                        </Form>
                    )
                }    
            </Formik>
            </ThemeProvider>
    )
}

export default LoginForm;