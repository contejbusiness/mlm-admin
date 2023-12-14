import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const { amount, bank } = await req.json();
    console.log("🚀 ~ file: route.ts:16 ~ amount, bank:", amount, bank);

    const transactionResult = await prismadb.$transaction(async (prisma) => {
      // Step 1: Check if the user has enough balance
      const user = await prisma.user.findUnique({
        where: { id: params.userId },
        select: { balance: true },
      });

      if (!user || user.balance < amount) {
        throw new Error(
          "User does not have enough balance for the redeem request."
        );
      }

      await prisma.user.update({
        where: { id: params.userId },
        data: { balance: user.balance - amount },
      });

      const newRedeem = await prisma.redeem.create({
        data: {
          userId: params.userId,
          amount: amount,
          bank: bank,
        },
      });

      return newRedeem;
    });

    console.log(transactionResult);
    return NextResponse.json(transactionResult);
  } catch (error) {
    console.log("[USER_PATCH_Redeem]", error);
    return new NextResponse(`Internal error - ${error}`, {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  console.log("I am called");
  try {
    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: { id: params.userId },
      include: { referrals: true, plan: true },
    });
    console.log("🚀 ~ file: route.ts:72 ~ user:", user);

    if (!user) return new NextResponse("User not found", { status: 400 });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET_Redeem]", error);
    return new NextResponse(`Internal error - ${error}`, {
      status: 500,
    });
  }
}
