import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await prismadb.user2.create({
      data: {
        username: "1235",
        email: "test@123",
        referredById: 1,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const user = await prisma?.user2.update({
    where: {
      id: 1,
    },
    data: {
      referredById: 2,
    },
  });

  return NextResponse.json(user);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      const users = await prismadb.user2.findMany({
        include: { referrals: true },
      });
      return NextResponse.json(users);
    } else {
      const user = await prismadb.user2.findUnique({
        where: {
          id: 1,
        },
        include: {
          referrals: true,
        },
      });
      console.log("🚀 ~ file: route.ts:70 ~ user:", user);

      if (!user) {
        console.log("user not found");
        return new NextResponse("User not found", { status: 400 });
      }

      return NextResponse.json(user);
    }
  } catch (error) {
    console.log("🚀 ~ file: route.ts:75 ~ GET ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
