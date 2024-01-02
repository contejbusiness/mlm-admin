import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
      include: { plan: true },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!user.plan)
      return NextResponse.json(
        { error: "No Active Plan Fouund" },
        { status: 404 }
      );

    const updatedUser = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        balance: user.balance + user.plan.price * 0.05,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[USER_PATCH_REFFERAL]", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
