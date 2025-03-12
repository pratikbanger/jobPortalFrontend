'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import MoonLoader from "react-spinners/MoonLoader";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {

    const API = "http://localhost:5000/api/auth/register"

    const router = useRouter()
    const [btnSpinner, setBtnSpinner] = useState(false)


    const signUpForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().required('Full Name is required'),
            email: yup.string().required('Email is required'),
            password: yup.string().required('Password is required'),
            confirmPassword: yup.string().required('Please Enter Confirm Password').oneOf([yup.ref("password"), null], "Password doesn't match"),
            role: yup.string().required('User Type is required'),
        }),
        onSubmit: async (values) => {

            try {

                setBtnSpinner(true)
                const response = await axios.post(API, values)
                console.log("🚀 ~ onSubmit: ~ response:", response)

                if (response.data.status == true) {
                    toast.success(response.data.message);
                    router.push('/auth/login')
                } else {
                    toast.error(response.data.message);
                }

            } catch (error) {
                console.log("🚀 ~ onSubmit: ~ error:", error)
                toast.error(error.response.data.message);
            } finally {
                setBtnSpinner(false)
            }
        }
    });

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <form className="max-w-sm mx-auto mt-28" onSubmit={signUpForm.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        {...signUpForm.getFieldProps("name")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="eg: John Doe"
                    />
                    {signUpForm.touched.name && signUpForm.errors.name
                        ? <div className="text-red-600 text-sm" style={{ display: "block" }}>{signUpForm.errors.name}</div>
                        : ''
                    }
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input
                        type=""
                        id="email"
                        name='email'
                        {...signUpForm.getFieldProps("email")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="eg: your_name@mail.com"
                    />
                    {signUpForm.touched.email && signUpForm.errors.email
                        ? <div className="text-red-600 text-sm" style={{ display: "block" }}>{signUpForm.errors.email}</div>
                        : ''
                    }
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        {...signUpForm.getFieldProps("password")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Combination of alpha numeric & symbol'
                    />
                    {signUpForm.touched.password && signUpForm.errors.password
                        ? <div className="text-red-600 text-sm" style={{ display: "block" }}>{signUpForm.errors.password}</div>
                        : ''
                    }
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input
                        type="Password"
                        id="confirmPassword"
                        name='confirmPassword'
                        {...signUpForm.getFieldProps("confirmPassword")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Combination of alpha numeric & symbol'
                    />
                    {signUpForm.touched.confirmPassword && signUpForm.errors.confirmPassword
                        ? <div className="text-red-600 text-sm" style={{ display: "block" }}>{signUpForm.errors.confirmPassword}</div>
                        : ''
                    }
                </div>
                <div className="flex items-start mb-1">
                    <div className="flex items-center h-5">
                        <input
                            type="radio"
                            name='role'
                            value="Recruiter"
                            onChange={(e) => {
                                signUpForm.setFieldValue('role', e.target.value)
                            }}
                            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 me-5 text-sm font-medium text-gray-900 dark:text-gray-300">Recruiter</label>
                    <div className="flex items-center h-5">
                        <input
                            type="radio"
                            name='role'
                            value="Job Seeker"
                            onChange={(e) => {
                                signUpForm.setFieldValue('role', e.target.value)
                            }}
                            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 block">Job Seeker</label>
                </div>
                <p className='text-sm mt-3'>Already registered? <Link className='text-blue-500' href="/auth/login">login here</Link></p>

                {signUpForm.touched.role && signUpForm.errors.role
                    ? <div className="text-red-600 text-sm" style={{ display: "block" }}>{signUpForm.errors.role}</div>
                    : ''
                }
                {btnSpinner
                    ? <div className='mt-3'>
                        <MoonLoader
                            color="#008cff"
                            loading={btnSpinner}
                            cssOverride={{
                                display: "block",
                                margin: "0 auto",
                            }}
                            size={30}
                        // aria-label="Loading Spinner"
                        // data-testid="loader"
                        />
                    </div>
                    : <button type="submit" disabled={btnSpinner} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">Register</button>
                }


            </form>
        </>
    );
}

export default page;
