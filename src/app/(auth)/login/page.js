"use client"
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IsLoggedInContext } from '@/context/isLoggedInContext';
import { CirclesWithBar } from 'react-loader-spinner';
import { IsSpinnerContext } from '@/context/isSpinnerContext';

const Login = () => {
    const router = useRouter();
    const { isLoggedIn, setIsLoggedIn, isWriterLoggedIn, setIsWriterLoggedIn } = useContext(IsLoggedInContext);
    const { isSpinner, setIsSpinner } = useContext(IsSpinnerContext);

    useEffect(() => {
        if (isLoggedIn || isWriterLoggedIn || localStorage.getItem("token")) {
            toast.error("User Already logged in!");
            router.push("/");
        }
        setIsSpinner(false);
    }, []);


    const verifyUser = (e) => {
        setIsSpinner(true);
        e.preventDefault();

        fetch("/api/verifyUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        }).then(response => response.json()).then(res => {
            if (res.success) {
                toast.success(res.data.message);
                if (res.data.role === "User") {
                    localStorage.setItem("token", res.accessToken);
                    setIsLoggedIn(true);
                    setIsWriterLoggedIn(false);
                    router.push("/");
                } else if (res.data.role === "Writer") {
                    localStorage.setItem("token", res.accessToken);
                    setIsLoggedIn(false);
                    setIsWriterLoggedIn(true);
                    router.push("/admin");
                } else {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    setIsWriterLoggedIn(false);
                    router.push("/login");
                }
            } else {
                toast.error(res.error);
                setIsLoggedIn(false);
                setIsWriterLoggedIn(false);
                localStorage.removeItem("token");
                router.push("/login");
            }
            setIsSpinner(false);
        }).catch(err => {
            console.log(err);
            setIsLoggedIn(false);
            setIsWriterLoggedIn(false);
            toast.error("Somthing went wrong! Please try again");
            setIsSpinner(false);
            router.push("/login");
        });
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

            {!isSpinner && <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[91vh] lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={verifyUser}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <div className="flex items-center justify-end">
                                    {/* <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div> */}
                                    <a href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500">Forgot password?</a>
                                </div>

                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Sign in</button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/signup" className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    );
}

export default Login;