import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import CommentReply from '@/models/CommentReply';

export async function POST(request) {
    try {
        const headersList = headers();
        const accessToken = headersList.get('access-token');
        const { name, email, role } = verify(accessToken, process.env.JWT_SECRET);
        const reqData = await request.json();

        if (role === "User") {
            const commentReply = new CommentReply({
                commentId: reqData.commentId,
                replyerName: name,
                replyerImg: email,
                content: reqData.content
            });

            await commentReply.save();

            return NextResponse.json({ success: true, data: { message: "Replyed Successfully!" } });
        } else {
            return NextResponse.json({ success: false, error: "Access Denied!" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}