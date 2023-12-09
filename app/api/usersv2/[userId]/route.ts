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

    if (!user) return new NextResponse("User not found", { status: 404 });

    if (user?.referredById != null)
      return new NextResponse("Reffer Code can only be applied once", {
        status: 400,
      });

    const refferedUser = await prismadb.user.findFirst({
      where: { myRefferalCode: refferalCode },
    });

    if (!refferedUser)
      return new NextResponse("Invalid Refferal Code", { status: 404 });

    const updatedUser = await prismadb.user.update({
      where: { id: params.userId },
      data: {
        referredById: refferedUser.id,
      },
    });

    return NextResponse.json(updatedUser);
   
  } catch (error) {
    console.log("[USER_PATCH_REFFERAL]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
