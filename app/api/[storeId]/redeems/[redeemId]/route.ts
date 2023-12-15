import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { redeemId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.redeemId) {
      return new NextResponse("Redeem id is required", { status: 400 });
    }

    const redeem = await prismadb.requestBalance.findUnique({
      where: {
        id: params.redeemId,
      },
      include: {
        user: true,
      },
    });

    if (!redeem) {
      return new NextResponse("Redeem request not found", { status: 404 });
    }
    await prismadb.$transaction([
      prismadb.requestBalance.update({
        where: {
          id: params.redeemId,
        },
        data: {
          status: "COMPLETED",
        },
      }),
      prismadb.user.update({
        where: {
          id: redeem.userId,
        },
        data: {
          balance: {
            increment: redeem.amount,
          },
        },
      }),
    ]);

    return NextResponse.json(redeem);
  } catch (error) {
    console.log("[REDEEM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
