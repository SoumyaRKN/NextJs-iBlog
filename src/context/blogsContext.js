"use client"
import { createContext, useState } from "react";

export const BlogsContext = createContext();

const BlogsState = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    return (
        <BlogsContext.Provider value={{ blogs, setBlogs }}>
            {children}
        </BlogsContext.Provider>
    );
}

export default BlogsState;