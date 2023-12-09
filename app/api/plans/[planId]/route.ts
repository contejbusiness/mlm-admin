import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { planId: string } }
) {
  try {
    if (!params.planId) {
      return new NextResponse("Plan id is required", { status: 400 });
    }

    const { userId } = await req.json();

    if (!userId)
      return new NextResponse("User id is required", { status: 400 });

    const plan = await prismadb.plan.findUnique({
      where: {
        id: params.planId,
      },
    });

    if (!plan) return new NextResponse("Plan not found", { status: 404 });

    const user = await prismadb.user.findUnique({
      where: { id: userId },
      include: { referredBy: true },
    });

    if (!user) return new NextResponse("User not found", { status: 400 });

    if (user.balance < plan.price) {
      return new NextResponse(
        "Insuffecient Balance, Please add balance to buy plan",
        { status: 400 }
      );
    }

    if (user.referredBy == null)
      return new NextResponse("Invalid Refference Id", { status: 400 });

    await prismadb.$transaction([
      prismadb.user.update({
        where: {
          id: user.referredBy.id,
        },
        data: {
          balance: {
            increment: 50,
          },
        },
      }),
      prismadb.user.update({
        where: {
          id: userId,
        },
        data: {
          balance: {
            decrement: plan.price,
          },
          plan: { connect: { id: plan.id } },
        },
      }),
    ]);

    return NextResponse.json(plan);
  } catch (error) {
    console.log("[PLAN_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const plan = await prismadb.plan.findUnique({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.log("[PLAN_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Plan id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const plan = await prismadb.plan.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.log("[PLAN_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, price, reward } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!reward) {
      return new NextResponse("Reward  is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const plan = await prismadb.plan.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        reward,
      },
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.log("[PLAN_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
