import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { amount, imageUrl } = body;

    if (!userId) {
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
        userId,
        amount,
        imageUrl
      }
    });
  
    return NextResponse.json(request);
  } catch (error) {
    console.log('[REQUEST_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if(!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const requests = await prismadb.requestBalance.findMany({
      where: {
        userId:userId
      }
    });
  
    return NextResponse.json(requests);
  } catch (error) {
    console.log('[REQUEST_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
