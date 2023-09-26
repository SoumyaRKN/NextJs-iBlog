"use client"
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CirclesWithBar } from 'react-loader-spinner';
import { IsSpinnerContext } from '@/context/isSpinnerContext';
import { IsLoggedInContext } from '@/context/isLoggedInContext';

const Signup = () => {
    const router = useRouter();
    const { isLoggedIn } = useContext(IsLoggedInContext);
    const { isSpinner, setIsSpinner } = useContext(IsSpinnerContext);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmedPassword, setIsConfirmedPassword] = useState(true);

    const regex = {
        name: /^[a-zA-Z]{3,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/
    }

    useEffect(() => {
        if (isLoggedIn || localStorage.getItem("token")) {
            toast.error("User Already logged in!");
            router.push("/");
        }
        setIsSpinner(false);
    }, []);

    const validateData = (e) => {
        if (e.target.name == "name") {
            regex.name.test(e.target.value) ? setIsNameValid(true) : setIsNameValid(false);
        } else if (e.target.name == "email") {
            regex.email.test(e.target.value) ? setIsEmailValid(true) : setIsEmailValid(false);
        } else if (e.target.name == "password") {
            regex.password.test(e.target.value) ? setIsPasswordValid(true) : setIsPasswordValid(false);
        } else if (e.target.name == "confirmPassword") {
            document.getElementById("password").value === e.target.value ? setIsConfirmedPassword(true) : setIsConfirmedPassword(false);
        }
    }

    const saveUser = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const occupation = document.getElementById("occupation").value;
        const registerAs = document.getElementById("registerAs").checked ? "Writer" : "User";
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmedPassword && name !== "" && email !== "" && password !== "" && confirmPassword !== "" && registerAs !== "") {
            setIsSpinner(true);
            fetch("/api/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    occupation: occupation !== "" ? occupation : undefined,
                    role: registerAs,
                    password: password
                })
            }).then(response => response.json()).then(res => {
                if (res.success) {
                    toast.success(res.data.message);
                    router.push("/login");
                } else {
                    toast.error(res.error);
                }
                setIsSpinner(false);
            }).catch(err => {
                console.log(err);
                toast.error("Somthing went wrong! Please try again");
                setIsSpinner(false);
            });
        } else {
            toast.error("Fill Correct Details!");
        }
    }


    return (
        <>
            {isSpinner && <CirclesWithBar
                height="200"
                width="200"
                color="#0534ae"
                wrapperClass="justify-center items-center min-h-screen"
                ariaLabel='circles-with-bar-loading'
            />}

            {!isSpinner && <section className="bg-gray-50 dark:bg-gray-900 py-16">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[91vh] lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up for an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={saveUser}>
                                <div>
                                    <label htmlFor="name" className={`block mb-2 text-sm font-medium ${isNameValid ? "text-gray-900 dark:text-white" : "text-red-700 dark:text-red-500"}`}>Your name</label>

                                    <input type="text" name="name" id="name" className={`border sm:text-sm rounded-lg w-full p-2.5 block ${isNameValid ? "bg-gray-50  border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} placeholder="John Wick" required onChange={validateData} />

                                    {!isNameValid && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Name should contain atleast 3 charecters!</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isEmailValid ? "text-gray-900 dark:text-white" : "text-red-700 dark:text-red-500"}`}>Your email</label>

                                    <input type="email" name="email" id="email" className={`border sm:text-sm rounded-lg w-full p-2.5 block ${isEmailValid ? "bg-gray-50  border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} placeholder="name@company.com" required onChange={validateData} />

                                    {!isEmailValid && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Enter a valid email!</p>}
                                </div>

                                <div>
                                    <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Occupation</label>

                                    <input type="text" name="occupation" id="occupation" className="border sm:text-sm rounded-lg w-full p-2.5 blockbg-gray-50  border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your occupation..." />
                                </div>

                                <div>
                                    <label htmlFor="password" className={`block mb-2 text-sm font-medium ${isPasswordValid ? "text-gray-900 dark:text-white" : "text-red-700 dark:text-red-500"}`}>Password</label>

                                    <input type="password" name="password" id="password" placeholder="••••••••" className={`border sm:text-sm rounded-lg w-full p-2.5 block ${isPasswordValid ? "bg-gray-50  border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} required onChange={validateData} />

                                    {!isPasswordValid && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Password must contain atleast 8 charecters with one uppercase,one lowercase and one number!</p>}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className={`block mb-2 text-sm font-medium ${isConfirmedPassword ? "text-gray-900 dark:text-white" : "text-red-700 dark:text-red-500"}`}>Confirm Password</label>

                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className={`border sm:text-sm rounded-lg w-full p-2.5 block ${isConfirmedPassword ? "bg-gray-50  border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} required onChange={validateData} />

                                    {!isConfirmedPassword && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Password doesn&apos;t matched!</p>}
                                </div>

                                <div className="flex items-center justify-start">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="registerAs" name="registerAs" aria-describedby="registerAs" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="registerAs" className="text-gray-500 dark:text-gray-300">Register As Writer</label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" disabled={!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmedPassword} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Sign Up</button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">Sign In</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    );
}

export default Signup;