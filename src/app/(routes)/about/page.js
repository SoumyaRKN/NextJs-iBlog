import Link from 'next/link';
import React from 'react';

const About = () => {
    return (
        <div className="container p-10 text-center">
            <span className="text-4xl font-bold">Welcome to iBlog</span>
            <p className="text-lg mb-8 mt-4 px-40">
                Where curiosity meets knowledge, and inspiration sparks creativity. Dive into a world of thought-provoking articles, insightful how-tos, and engaging stories. Whether you&apos;re a seasoned expert or just starting your journey, there&apos;s something here for everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-14">
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">In-Depth Guides</h2>
                    <p>Master new skills and expand your horizons with our comprehensive guides.</p>
                </div>
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Inspiring Stories</h2>
                    <p>Discover tales of triumph, innovation, and personal growth from around the globe.</p>
                </div>
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Expert Advice</h2>
                    <p>Learn from the best in their fields with advice from industry leaders and seasoned professionals.</p>
                </div>
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Community Discussions</h2>
                    <p>Join the conversation, share your thoughts, and connect with like-minded individuals.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Why Choose iBlog?</h2>
                    <p>Every article is carefully crafted to provide value, inspiration, and actionable insights.</p>
                </div>
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Diverse Perspectives</h2>
                    <p>We believe in representing a wide range of voices and experiences, fostering inclusivity and understanding.</p>
                </div>
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Interactive Learning</h2>
                    <p>Engage with quizzes, challenges, and interactive content to enhance your learning experience.</p>
                </div>
                <div className="bg-slate-300 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Stay Updated</h2>
                    <p>Subscribe to our newsletter and never miss out on the latest insights and updates.</p>
                </div>
            </div>
            <p className="text-lg mb-8 mt-16">
                Ready to embark on a journey of discovery? Click <Link href={"/"} className="text-white bg-[#333] px-6 py-4 rounded-full font-bold hover:bg-[#555] transition duration-300">Get Started</Link> and let&apos;s explore together!
            </p>
        </div>
    );
}

export default About;