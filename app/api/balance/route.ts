import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, amount } = body;

    const user = await prismadb.user.update({
      where: { id },
      data: { balance: amount },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[PLAN_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
