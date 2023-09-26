"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';

const HomeModal = () => {
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            document.getElementById('homePageloginPromoModal').showModal();
        }
    }, []);


    return (
        <dialog dialog="true" id="homePageloginPromoModal" className="modal modal-bottom sm:modal-middle" >
            <div className="modal-box min-h-[50vh] bg-gray-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">Hello Stranger!</h3>
                <div className='py-16 px-6'>
                    <p className='text-xl text-center text-indigo-700 mb-4'>New here? <Link href={"/signup"}>Create an account and explore.</Link></p>
                    <div className="divider">OR</div>
                    <p className='text-xl text-center text-indigo-700 mb-4'>Already have account? Then why waiting. <Link href={"/login"}>Login to your account and explore.</Link></p>
                </div>
            </div>
        </dialog >
    );
}

export default HomeModal;