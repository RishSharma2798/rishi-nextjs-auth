import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcrypt from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    console.log("request received in reset password route");
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody, "req body in server");
    const userExists = await User.findOne({ email });
    console.log(userExists);
    //check if user present
    if (!userExists) {
      return NextResponse.json({ error: "User doesnt exist" }, { status: 400 });
    }

    const sendingEmail = await sendEmail({
      email,
      emailType: "RESET",
      userId: userExists._id,
    });
    console.log(sendingEmail, "send email");
    return NextResponse.json({
      message: "Link sent successfully",
      success: true,
      userExists,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log("request received in reset password route");
    const reqBody = await request.json();
    const { token, password } = reqBody;
    console.log(reqBody, "req body in server");
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    // create a hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
      user: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
