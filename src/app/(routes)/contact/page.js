"use client"
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CirclesWithBar } from 'react-loader-spinner';
import { IsSpinnerContext } from '@/context/isSpinnerContext';

const Contact = () => {
    const { isSpinner, setIsSpinner } = useContext(IsSpinnerContext);

    const saveContacts = (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        if (email !== "" && subject !== "" && message !== "") {
            setIsSpinner(true);
            fetch("/api/saveContact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    subject: subject,
                    message: message
                })
            }).then(response => response.json()).then(res => {
                setIsSpinner(false);
                if (res.success) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.error);
                }
            }).catch(err => {
                console.log(err);
                toast.error("Somthing went wrong! Please try again");
                setIsSpinner(false);
            });
        } else {
            toast.error("Please fill all the details!");
        }
    }

    useEffect(() => {
        setIsSpinner(false);
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

            {!isSpinner && <section class="bg-white dark:bg-gray-900 py-10 px-4">
                <div class="mx-auto max-w-screen-md mb-10">
                    <h2 class="mb-4 text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    <p class="mb-8 lg:mb-12 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback? Need details about our Business plan? Let us know.</p>

                    <form class="space-y-8" onSubmit={saveContacts}>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@example.com" required />
                        </div>
                        <div>
                            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." required></textarea>
                        </div>

                        <button type="submit" class="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Send message</button>
                    </form>
                </div>
            </section>}
        </>
    );
}

export default Contact;