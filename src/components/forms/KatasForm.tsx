import React from 'react';
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

const KatasForm = () => {
    const initialCredentials = {
        email: '',
        password: ''
    }

    let navigate = useNavigate();

    return (
        <div>
            <h4>Login Form</h4>
            {/* Formik to encapsule a Form */}
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={async(values) => {
                    // await new Promise((response) => setTimeout(response, 1000));
                    // alert(Json.stringify(values, null, 2));
                    // console.table(values);
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
                            {/* Email */}
                            <label htmlFor='email'>Email</label>
                            <Field id='email' type='email' name='email' placeholder='example@email.com'/>
                            {/* Email Errors */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>
                                )
                            }


                            {/* Password */}
                            <label htmlFor='password'>Password</label>
                            <Field id='password' type='password' name='password'/>
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }

                            {/* SUBMIT */}
                            <button type='submit' >Login</button>
                            {/* Message if the form is submitting */}
                            {
                                isSubmitting ? (<p>Checking credentials...</p>) : null
                            }
                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}

export default KatasForm;