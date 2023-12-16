import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    let { refferalCode } = await req.json();

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (user?.referredById != null)
      return NextResponse.json(
        { error: "Reffer Code can only be applied once" },
        {
          status: 400,
        }
      );

    if (refferalCode == 0) {
      const updatedUser = await prismadb.user.update({
        where: { id: params.userId },
        data: { referredById: "0" },
      });

      return NextResponse.json(updatedUser);
    }

    const refferedUser = await prismadb.user.findFirst({
      where: { myRefferalCode: Number(refferalCode) },
    });

    if (!refferedUser)
      return NextResponse.json(
        { error: "Invalid Refferal Code" },
        { status: 404 }
      );

    const updatedUser = await prismadb.user.update({
      where: { id: params.userId },
      data: {
        referredById: refferedUser.id,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[USER_PATCH_REFFERAL]", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const { balance } = await req.json();

    if (!balance) {
      return new NextResponse("Balance is required", { status: 400 });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        balance,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USER_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
