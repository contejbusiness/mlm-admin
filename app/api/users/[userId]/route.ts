// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

// import prismadb from "@/lib/prismadb";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     let { refferalCode } = await req.json();

//     if (!params.userId) {
//       return new NextResponse("User id is required", { status: 400 });
//     }

//     const user = await prismadb.user.findUnique({
//       where: {
//         id: params.userId,
//       },
//     });

//     if (!user) return new NextResponse("User not found", { status: 404 });

//     if (user?.refferal > 0)
//       return new NextResponse("Reffer Code can only be applied once", {
//         status: 400,
//       });

//     if (!refferalCode) {
//       refferalCode = 0;
//       const updatedUser = await prismadb.user.update({
//         where: {
//           id: params.userId,
//         },
//         data: {
//           refferal: refferalCode,
//         },
//       });
//       return NextResponse.json(updatedUser);
//     } else {
//       const refferedBy = await prismadb.user.findFirst({
//         where: { myRefferalCode: refferalCode}
//       })

//       await prismadb.$transaction([
//         prismadb.user.update({
//           where: {
//             id: params.userId,
//           },
//           data: {
//             refferal: refferalCode,
//           }
//         }),
//         // prismadb.refferal.create({
//         //   data: {
//         //     userId: params.userId
//         //   }
//         // })
//       ]);
//     }
//   } catch (error) {
//     console.log("[USER_PATCH_REFFERAL]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
