import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(/hero.jpg)', backgroundRepeat: 'no-repeat' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Explore the World of Knowledge</h1>
                    <p className="mb-5">Discover Insights, Inspiration, and Ideas.</p>
                    <Link href={"/blogs"} className="btn btn-neutral">Explore Blogs</Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;