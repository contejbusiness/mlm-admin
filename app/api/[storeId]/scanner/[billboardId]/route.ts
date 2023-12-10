import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Scanner id is required", { status: 400 });
    }

    const scanner = await prismadb.scanner.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(scanner);
  } catch (error) {
    console.log("[SCANNER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardId) {
      return new NextResponse("Scanner id is required", { status: 400 });
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

    const scanner = await prismadb.scanner.delete({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(scanner);
  } catch (error) {
    console.log("[SCANNER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth(); // Replace with your authentication logic

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const { billboardId } = params;

    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    await prismadb.$transaction(async (prisma) => {
      await prisma.scanner.updateMany({
        data: { active: false },
      });

      // Step 2: Update the specific billboard
      const updatedBillboard = await prisma.scanner.update({
        where: { id: billboardId },
        data: {
          active: true,
        },
      });

      console.log("Scanner updated:", updatedBillboard);
    });

    return new NextResponse("Scanner updated successfully", { status: 200 });
  } catch (error) {
    console.log("[SCANNER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
