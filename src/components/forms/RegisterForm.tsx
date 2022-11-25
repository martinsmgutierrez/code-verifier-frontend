import React from 'react';

import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import {register} from '../../services/authService'
import { AxiosResponse } from 'axios';

const registerSchema = Yup.object().shape(
    {
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid Email format').required('Email is required'),
        password: Yup.string().min(8,"Password too short").required('Password is required'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password Confirmation is required'),
        age: Yup.number().required('Age is required'),
    }
)



const RegisterForm = () => {
    const initialCredentials = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation:'',
        age: 0
    }

    return (
        <div>
            <h4>Register Form</h4>
            {/* Formik to encapsule a Form */}
            <Formik
                initialValues={initialCredentials}
                validationSchema={registerSchema}
                onSubmit={async(values) => {
                    // await new Promise((response) => setTimeout(response, 1000));
                    // alert(Json.stringify(values, null, 2));
                    // console.table(values);
                    register(values.name,values.email, values.password, values.age).then(async(response: AxiosResponse) => {
                        if(response.status === 200) {
                            alert(JSON.stringify(values, null, 2));
                            if(response.data.token){
                                await sessionStorage.setItem('sessionJWTToken', response.data.token)
                            }else{
                                throw new Error('Error generating Login Token')
                            }
                        }else{
                            throw new Error('Information Incorrect')
                        }
                    }).catch((error) => console.log(`[Register Error]: Somethind went wrong: ${error}`))

                }}
            >
                {
                    ({values, touched, errors, isSubmitting, handleChange, handleBlur}) =>
                    (
                        <Form>
                            {/* Name */}
                            <label htmlFor='name'>Name: </label>
                            <Field id='name' type='name' name='name' placeholder='example'/>
                            {/* Name Errors */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>
                                )
                            }

                            {/* Email */}
                            <br/>
                            <label htmlFor='email'>Email: </label>
                            <Field id='email' type='email' name='email' placeholder='example@email.com'/>
                            {/* Email Errors */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>
                                )
                            }


                            {/* Password */}
                            <br/>
                            <label htmlFor='password'>Password: </label>
                            <Field id='password' type='password' name='password'/>
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }

                            {/* PasswordConfirmation */}
                            <br/>
                            <label htmlFor='passwordConfirmation'>PasswordConfirmation: </label>
                            <Field id='passwordConfirmation' type='password' name='passwordConfirmation'/>
                            {/* Password Errors */}
                            {
                                errors.passwordConfirmation && touched.passwordConfirmation && (
                                    <ErrorMessage name='passwordConfirmation' component='div'></ErrorMessage>
                                )
                            }

                            {/* Age */}
                            <br/>
                            <label htmlFor='age'>Age: </label>
                            <Field id='age' type='age' name='age'/>
                            {/* Password Errors */}
                            {
                                errors.age && touched.age && (
                                    <ErrorMessage name='age' component='div'></ErrorMessage>
                                )
                            }

                            {/* SUBMIT */}
                            <br/>
                            <button type='submit' >Register</button>
                            {/* Message if the form is submitting */}
                            {
                                isSubmitting ? (<p>Checking Register...</p>) : null
                            }
                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}

export default RegisterForm;
