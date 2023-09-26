import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { IsLoggedInContext } from '@/context/isLoggedInContext';
import { IsSpinnerContext } from '@/context/isSpinnerContext';

const Comments = ({ comment, reload }) => {
    const { isLoggedIn } = useContext(IsLoggedInContext);
    const { setIsSpinner } = useContext(IsSpinnerContext);

    const postCommentReply = (e) => {
        setIsSpinner(true);
        e.preventDefault();

        fetch("/api/addCommentReply", {
            method: "POST",
            headers: {
                "Access-Token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                commentId: comment._id,
                content: document.getElementById(comment._id).value
            })
        }).then(response => response.json()).then(res => {
            if (res.success) {
                reload();
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


    return (
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />{comment.commenterName}
                        {/* <Image width={100} height={100} className="mr-2 w-6 h-6 rounded-full" alt="Michael Gough" src={`${comment.commenterImg}`} />{comment.commenterName} */}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate="true" dateTime={comment.createdAt}
                        title={comment.createdAt}>{comment.createdAt}</time></p>
                </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>

            {isLoggedIn && <form onSubmit={postCommentReply}>
                <div className="mt-4 space-x-4">
                    <textarea id={comment._id} rows="2" className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a Reply..." required></textarea>

                    <button type="submit" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                        <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        </svg>Reply
                    </button>
                </div>
            </form>}

            {!isLoggedIn && <div className='text-sm mt-4 space-x-4 text-red-300'>Please login to reply on this comment</div>}

            {comment.replies.map(item => {
                return <article key={item._id} className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />{item.replyerName}
                                {/* <Image className="mr-2 w-6 h-6 rounded-full" src={`${item.replyerName}`} alt={item.replyerName} />{item.replyerName} */}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate="true" dateTime={item.createdAt}
                                title={item.createdAt}>{item.createdAt}</time></p>
                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">{item.content}</p>
                </article>
            })}

        </article>
    );
}

export default Comments;