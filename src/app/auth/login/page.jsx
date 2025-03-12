'use client'

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import MoonLoader from "react-spinners/MoonLoader";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuthToken, saveAuthToken } from '../../../Service';

const page = () => {

    const authToken = getAuthToken()
    const router = useRouter()

    useEffect(() => {
        if (authToken) router.push('/')
    })

    const API = "http://localhost:5000/api/auth/login"

    const [btnSpinner, setBtnSpinner] = useState(false)

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            email: yup.string().required('Email is required'),
            password: yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {

            try {

                setBtnSpinner(true)
                const response = await axios.post(API, values)

                if (response.data.status == true) {
                    toast.success(response.data.message);
                    localStorage.setItem('role', response.data.data.role)

                    saveAuthToken(response.data.token)

                    router.push('/')
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
            <form className="max-w-sm mx-auto mt-28" onSubmit={loginForm.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input
                        type=""
                        id="email"
                        name='email'
                        {...loginForm.getFieldProps("email")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="eg: your_name@mail.com"
                    />
                    {loginForm.touched.email && loginForm.errors.email
                        ? <div className="text-red-600 text-sm" style={{ display: "block" }}>{loginForm.errors.email}</div>
                        : ''
                    }
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        {...loginForm.getFieldProps("password")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Combination of alpha numeric & symbol'
                    />
                    {loginForm.touched.password && loginForm.errors.password
                        ? <div className="text-red-600 text-sm" style={{ display: "block" }}>{loginForm.errors.password}</div>
                        : ''
                    }
                </div>
                <p className='text-sm'>New user? <Link className='text-blue-500' href="/auth/register">register here</Link></p>
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
                        />
                    </div>
                    : <button type="submit" disabled={btnSpinner} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">Login</button>
                }


            </form>
        </>
    );
}

export default page;