import { NextResponse } from 'next/server';
import { genSaltSync, hashSync } from 'bcrypt';
import User from '@/models/User';

export async function POST(request) {
  try {
    const reqData = await request.json();
    const salt = genSaltSync();
    const hash = hashSync(reqData.password, salt);

    await User.findOneAndUpdate({ _id: reqData.id }, { password: hash });

    return NextResponse.json({ success: true, data: { message: "Password Updated Successfully!" } });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
