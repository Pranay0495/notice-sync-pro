import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import { Client } from "@/lib/models/Client";
import { User } from "@/lib/models/User";
import { Notice } from "@/lib/models/Notice";
import { scrapeIncomeTaxNotices } from "@/lib/automation/incomeTaxScraper";
import { scrapeGSTNotices } from "@/lib/automation/gstScraper";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { clientId, portal } = await req.json();

    await connectToDatabase();

    // 1. Check Credits
    const user = await User.findById((session.user as any).id);
    if (!user || user.credits <= 0) {
      return NextResponse.json({ message: "Insufficient credits. Please upgrade your plan." }, { status: 403 });
    }

    // 2. Get Client Credentials
    const client = await Client.findOne({ _id: clientId, caId: user._id });
    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }

    let syncResult;
    if (portal === 'INCOME_TAX') {
      syncResult = await scrapeIncomeTaxNotices(client.itUsername, client.itPassword);
    } else {
      syncResult = await scrapeGSTNotices(client.gstUsername, client.gstPassword);
    }

    if (!syncResult.success) {
      return NextResponse.json({ message: syncResult.error || "Sync failed" }, { status: 500 });
    }

    // 3. Save Notices & Update Metadata
    const newNotices = [];
    for (const noticeData of syncResult.notices) {
      try {
        const savedNotice = await Notice.findOneAndUpdate(
          { 
            clientId: client._id, 
            portal: portal, 
            referenceNumber: noticeData.referenceNumber 
          },
          { ...noticeData, caId: user._id },
          { upsert: true, new: true }
        );
        newNotices.push(savedNotice);
      } catch (e) {
        // Probably duplicate or error, skip
      }
    }

    // 4. Update Client Sync Status
    if (portal === 'INCOME_TAX') {
      client.itLastSync = new Date();
    } else {
      client.gstLastSync = new Date();
    }
    await client.save();

    // 5. Deduct Credit
    user.credits -= 1;
    await user.save();

    return NextResponse.json({ 
      message: "Sync completed successfully", 
      newNoticesCount: newNotices.length,
      remainingCredits: user.credits
    });

  } catch (error: any) {
    console.error("Sync Route Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
