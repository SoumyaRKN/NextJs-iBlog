"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { IsSpinnerContext } from '@/context/isSpinnerContext';
import { useRouter } from 'next/navigation';

const ResetPassword = ({ params }) => {
    const router = useRouter();
    const { isSpinner, setIsSpinner } = useContext(IsSpinnerContext);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmedPassword, setIsConfirmedPassword] = useState(true);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    const validateData = (e) => {
        if (e.target.name == "password") {
            passwordRegex.test(e.target.value) ? setIsPasswordValid(true) : setIsPasswordValid(false);
        } else if (e.target.name == "confirmPassword") {
            document.getElementById("password").value === e.target.value ? setIsConfirmedPassword(true) : setIsConfirmedPassword(false);
        }
    }

    const resetPassword = (e) => {
        e.preventDefault();
        const password = document.getElementById("password").value;
        const confirmedPassword = document.getElementById("confirmPassword").value;

        if (password !== "" && confirmedPassword !== "" && isPasswordValid && isConfirmedPassword) {
            setIsSpinner(true);
            fetch("/api/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: params.slug.split("-")[0],
                    password: password
                })
            }).then(response => response.json()).then(res => {
                setIsSpinner(false);
                if (res.success) {
                    toast.success(res.data.message);
                    router.push("/login");
                } else {
                    toast.error(res.error);
                }
            }).catch(err => {
                console.log(err);
                toast.error("Something went wrong! Please try again.");
            });
        } else {
            toast.error("Please enter a valid password!");
        }
    }

    useEffect(() => {
        setIsSpinner(false);
        if (new Date() > new Date(params.slug.split("-")[1])) {
            toast.error("Reset link has been expired!");
            router.push("/login");
        }
    }, []);


    return (
        <>
            {isSpinner && <CirclesWithBar
                height="200"
                width="200"
                color="#0534ae"
                wrapperClass="justify-center items-center min-h-screen"
                ariaLabel='circles-with-bar-loading'
            />}

            {!isSpinner && <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[91vh] lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={resetPassword}>

                                <div>
                                    <label htmlFor="password" className={`block mb-2 text-sm font-medium ${isPasswordValid ? "text-gray-900 dark:text-white" : "text-red-700 dark:text-red-500"}`}>New Password</label>

                                    <input type="password" name="password" id="password" placeholder="••••••••" className={`border sm:text-sm rounded-lg w-full p-2.5 block ${isPasswordValid ? "bg-gray-50  border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} required onChange={validateData} />

                                    {!isPasswordValid && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Password must contain atleast 8 charecters with one uppercase,one lowercase and one number!</p>}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className={`block mb-2 text-sm font-medium ${isConfirmedPassword ? "text-gray-900 dark:text-white" : "text-red-700 dark:text-red-500"}`}>Confirm New Password</label>

                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className={`border sm:text-sm rounded-lg w-full p-2.5 block ${isConfirmedPassword ? "bg-gray-50  border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} required onChange={validateData} />

                                    {!isConfirmedPassword && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Password doesn&apos;t matched!</p>}
                                </div>

                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    );
}

export default ResetPassword;