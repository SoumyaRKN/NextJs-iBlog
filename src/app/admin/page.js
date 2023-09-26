"use client"
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CirclesWithBar } from 'react-loader-spinner';
import { IsLoggedInContext } from '@/context/isLoggedInContext';
import { IsSpinnerContext } from '@/context/isSpinnerContext';

const AdminHome = () => {
    const router = useRouter();
    const { isWriterLoggedIn } = useContext(IsLoggedInContext);
    const { isSpinner, setIsSpinner } = useContext(IsSpinnerContext);

    useEffect(() => {
        if (!isWriterLoggedIn) {
            router.push("/login");
        }
    }, [isWriterLoggedIn]);

    const saveBlog = (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const catagory = document.getElementById("catagory").value;
        const content = document.getElementById("content").value;

        if (title !== "" || catagory !== "" || content !== "") {
            setIsSpinner(true);

            fetch("/api/addBlog", {
                method: "POST",
                headers: {
                    "Access-Token": localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    catagory: catagory,
                    content: content
                })
            }).then(response => response.json()).then(res => {
                if (res.success) {
                    toast.success(res.data.message);
                    e.target.reset();
                } else {
                    toast.error(res.error);
                }
                setIsSpinner(false);
            }).catch(err => {
                console.log(err);
                setIsSpinner(false);
            });
        } else {
            toast.error("Please fill all the fields!");
        }
    }


    return (
        <>
            {isSpinner && <CirclesWithBar
                height="200"
                width="200"
                color="#0534ae"
                wrapperclassName="justify-center items-center min-h-screen"
                ariaLabel='circles-with-bar-loading'
            />}

            {!isSpinner && <div className="container py-10 px-20 min-h-screen">
                <h1 className="text-center mb-8">Write Blog Here</h1>
                <form onSubmit={saveBlog}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" id="title" name="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <select id="catagory" name="catagory" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                <option value="" selected>Select Catagory</option>
                                <option value="General">General</option>
                                <option value="Programing">Programing</option>
                                <option value="Gardening">Gardening</option>
                            </select>
                        </div>

                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <textarea id="content" name="content" rows="4" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "></textarea>
                        <label for="content" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Content</label>
                    </div>

                    <div className="mt-10">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default AdminHome;