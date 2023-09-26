import { NextResponse } from 'next/server';
import Blog from '@/models/Blog';
import Comment from '@/models/Comment';
import CommentReply from '@/models/CommentReply';

export async function GET(request) {
    try {
        const blogs = JSON.parse(JSON.stringify(await Blog.find().sort({ createdAt: -1 })));
        const comments = JSON.parse(JSON.stringify(await Comment.find().sort({ createdAt: -1 })));
        const commentReplies = await CommentReply.find().sort({ createdAt: -1 });

        blogs.forEach((blog, i) => {
            blogs[i].comments = [];
            comments.forEach((comment, j) => {
                if (blog._id == comment.blogId) {
                    blogs[i].comments.push(comment);
                }

                comments[j].replies = [];
                commentReplies.forEach(reply => {
                    if (comment._id == reply.commentId) {
                        comments[j].replies.push(reply);
                    }
                });
            });
        });

        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function POST(request) {
    const { slug } = await request.json();

    try {
        const blog = JSON.parse(JSON.stringify(await Blog.find({ slug: slug }).sort({ createdAt: -1 })));
        if (blog.length > 0) {
            const comments = JSON.parse(JSON.stringify(await Comment.find({ blogId: blog[0]._id }).sort({ createdAt: -1 })));
            const commentReplies = await CommentReply.find().sort({ createdAt: -1 });

            comments.forEach((comment, i) => {
                comments[i].replies = [];
                commentReplies.forEach(reply => {
                    if (comment._id == reply.commentId) {
                        comments[i].replies.push(reply);
                    }
                });
            });

            blog[0].comments = comments;

            return NextResponse.json({ success: true, data: blog });
        } else {
            return NextResponse.json({ success: false, error: "No Data Available!" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}