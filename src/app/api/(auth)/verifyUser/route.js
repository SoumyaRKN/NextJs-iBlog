import { NextResponse } from 'next/server';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '@/models/User';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const reqData = await request.json();
        const user = await User.find({ email: reqData.email });

        if (user.length > 0) {
            if (compareSync(reqData.password, user[0].password)) {
                const accessToken = sign({ name: user[0].name, email: user[0].email, role: user[0].role, occupation: user[0].occupation }, process.env.JWT_SECRET, { expiresIn: '24h' });

                return NextResponse.json({ success: true, data: { role: user[0].role, message: "logged in Successfully!" }, accessToken, user });
            } else {
                return NextResponse.json({ success: false, error: "Invalid Credentials!" });
            }
        } else {
            return NextResponse.json({ success: false, error: "User Does not Exists!" });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}