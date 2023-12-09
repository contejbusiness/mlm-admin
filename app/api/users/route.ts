import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    const { id, name, email, phone } = body;

    if (!id) {
      return new NextResponse("Id is required", { status: 400})
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone number is required", { status: 400 });
    }
    

    const ifUserExist = await prismadb.user.findUnique({
      where: { id}
    })
    console.log("🚀 ~ file: route.ts:30 ~ ifUserExist:", ifUserExist)

    if(ifUserExist) {
      return NextResponse.json(ifUserExist);
    }

    const user = await prismadb.user.create({
      data: {
        id,
        name,
        email,
        phone,
        myRefferalCode: Math.floor(Math.random()*90000) + 10000
      }
    });
  
    return NextResponse.json(user);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function GET(
  req: Request,

) {
 try {
  const {searchParams} = new URL(req.url);

  const userId = searchParams.get("userId");

  if(!userId) {
    return new NextResponse("User Id is required", {status: 400})
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: userId
    }
  })
  console.log("🚀 ~ file: route.ts:70 ~ user:", user)

  if(!user) {
    console.log("user not found")
    return new NextResponse("User not found", {status: 400})
  }

  return NextResponse.json(user)
 } catch (error) {
    return new NextResponse("Internal Error", {status: 500})
 }
}