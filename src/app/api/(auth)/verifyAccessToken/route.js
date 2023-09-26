import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function POST(request) {
    try {
        const headersList = headers();
        const accessToken = headersList.get('access-token');
        const { name, email, role } = verify(accessToken, process.env.JWT_SECRET);

        if (name !== "" && email !== "") {
            return NextResponse.json({ success: true, data: { verified: true, role, message: "User Verified Successfully!" } });
        } else {
            return NextResponse.json({ success: false, error: "User Verification Failed!" });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}