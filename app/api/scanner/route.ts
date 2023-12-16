import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const scanner = await prismadb.scanner.findMany();

    return NextResponse.json(scanner);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
