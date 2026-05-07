import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, credits, planId } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await connectToDatabase();
      
      const user = await User.findById(userId);
      if (user) {
        user.credits += parseInt(credits);
        user.plan = planId;
        user.subscriptionStatus = "active";
        await user.save();
        
        return NextResponse.json({ message: "Payment verified and credits added" }, { status: 200 });
      }
      
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ message: "Verification failed" }, { status: 500 });
  }
}
