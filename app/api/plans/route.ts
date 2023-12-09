import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, price, reward } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!reward) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const plan = await prismadb.plan.create({
      data: {
        name,
        price,
        reward,
      },
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.log("[PLANS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const plans = await prismadb.plan.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: true,
      },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
