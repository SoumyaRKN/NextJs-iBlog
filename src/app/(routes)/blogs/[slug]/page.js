"use client"
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IsLoggedInContext } from '@/context/isLoggedInContext';
import { IsSpinnerContext } from '@/context/isSpinnerContext';
import { CirclesWithBar } from 'react-loader-spinner';
import Comments from '@/components/Comments';

const SingleBlog = ({ params }) => {
    const [blog, setBlog] = useState(null);
    const { isLoggedIn } = useContext(IsLoggedInContext);
    const { isSpinner, setIsSpinner } = useContext(IsSpinnerContext);

    const getblog = async (slug) => {
        setIsSpinner(true);
        try {
            const response = await fetch("/api/getBlogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug })
            });
            const res = await response.json();

            if (res.success) {
                setBlog(res.data[0]);
            } else {
                toast.error("Somthing went wrong! Please Reload the page");
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong! Please Reload the page");
        }
        setIsSpinner(false);
    }

    const postComment = (e) => {
        setIsSpinner(true);
        e.preventDefault();

        fetch("/api/addComment", {
            method: "POST",
            headers: {
                "Access-Token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                blogId: blog._id,
                content: document.getElementById("comment").value
            })
        }).then(response => response.json()).then(res => {
            if (res.success) {
                getblog(params.slug);
                toast.success(res.data.message);
                e.target.reset();
            } else {
                toast.error("Somthing went wrong! Please try again.");
            }
            setIsSpinner(false);
        }).catch(err => {
            console.log(err);
            toast.error("Somthing went wrong! Please try again.");
            setIsSpinner(false);
        });
    }

    useEffect(() => {
        getblog(params.slug);
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

            {blog && !isSpinner && <>
                <div className="container px-6 py-10">
                    <div className="bg-slate-300 p-12 flex flex-col items-start shadow-md mb-6 rounded-sm w-full mx-auto">
                        <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{blog.category}</span>
                        <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{blog.title}</h2>
                        <p className="leading-relaxed mb-8">{blog.description}</p>
                        <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                            <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>{blog.views}
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>{blog.comments.length}
                            </span>
                        </div>
                        <a className="inline-flex items-center">
                            <img alt="blog" src="https://dummyimage.com/104x104" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                            {/* <Image width={100} height={100} alt="blog" src={`/img/author/${item.author}`} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" /> */}
                            <span className="flex-grow flex flex-col pl-4">
                                <span className="title-font font-medium text-gray-900">{blog.author}</span>
                                <span className="text-gray-400 text-xs tracking-widest mt-0.5">{blog.authorOccupation}</span>
                            </span>
                        </a>
                    </div>

                    <section className="container pb-16 antialiased mx-auto">
                        <div className="bg-white mx-auto p-4 pb-10">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({blog.comments.length})</h2>
                            </div>

                            {isLoggedIn && <form className="mb-6" onSubmit={postComment}>
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows="6"
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                        placeholder="Write a comment..." required></textarea>
                                </div>
                                <button type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-slate-950 rounded-lg focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-slate-500">
                                    Post comment
                                </button>
                            </form>}

                            {!isLoggedIn && <div className='text-xl text-center text-red-400'>Please login to post comment</div>}

                            {blog.comments.map(item => <Comments key={item._id} comment={item} reload={() => { getblog(params.slug); }} />)}
                        </div>
                    </section>
                </div>
            </>}
        </>
    );
}

export default SingleBlog;