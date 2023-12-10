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

export async function POST(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const body = await req.json();


    const { amount, imageUrl } = body;

    if (!params.requestId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const request = await prismadb.requestBalance.create({
      data: {
        userId: params.requestId,
        amount,
        imageUrl,
      },
    });

    return NextResponse.json(request);
  } catch (error) {
    console.log("[REQUEST_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const { userId } = auth();

    const requestBalanceId = params.requestId;

    const transactionResult = await prismadb.$transaction(async (prisma) => {
      const updatedRequestBalance = await prisma.requestBalance.update({
        where: { id: requestBalanceId },
        data: { status: "COMPLETED" },
        include: { user: true },
      });

      await prisma.user.update({
        where: { id: updatedRequestBalance.userId },
        data: { balance: { increment: updatedRequestBalance.amount } },
      });

      return updatedRequestBalance;
    });

    console.log(
      "RequestBalance completed with transaction:",
      transactionResult
    );

    return NextResponse.json(transactionResult); //
  } catch (error) {
    console.log("[REQUEST_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
