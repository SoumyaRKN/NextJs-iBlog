import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import Blog from '@/models/Blog';

export async function POST(request) {
    try {
        const reqData = await request.json();
        const headersList = headers();
        const accessToken = headersList.get('access-token');

        const { name, occupation } = verify(accessToken, process.env.JWT_SECRET);
        const slug = reqData.title.toLowerCase().replace(" ", "-").replace(",", "-").replace("_", "-");

        const blog = new Blog({
            slug: slug,
            title: reqData.title,
            description: reqData.content,
            category: reqData.catagory == "" ? "General" : reqData.catagory,
            author: name,
            authorOccupation: occupation,
            authorImg: "",
            views: 0
        });

        await blog.save();

        return NextResponse.json({ success: true, data: { message: "Blog Added Successfully!" } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}