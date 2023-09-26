import { NextResponse } from 'next/server';
import { genSaltSync, hashSync } from 'bcrypt';
import User from '@/models/User';

export async function POST(request) {
    try {
        const reqData = await request.json();
        const salt = genSaltSync();
        const hash = hashSync(reqData.password, salt);

        const user = new User({
            name: reqData.name,
            email: reqData.email,
            role: reqData.role,
            occupation: reqData.occupation,
            password: hash
        });

        await user.save();

        return NextResponse.json({ success: true, data: { message: "Your Account Created Successfully!" } });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}