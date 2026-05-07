import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Razorpay from "razorpay";
import connectToDatabase from "@/lib/db";
import { User } from "@/lib/models/User";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await req.json();

    let amount = 0;
    let credits = 0;

    if (planId === 'STARTER') {
      amount = 49900; // Rs 499 in paise
      credits = 100;
    } else if (planId === 'PRO') {
      amount = 99900; // Rs 999 in paise
      credits = 300;
    } else {
      return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: (session.user as any).id,
        planId: planId,
        credits: credits
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);

  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ message: "Payment initialization failed" }, { status: 500 });
  }
}
