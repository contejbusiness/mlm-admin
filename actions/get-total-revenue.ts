import prismadb from "@/lib/prismadb";
import { RequestBalance } from "@prisma/client";

export const getTotalRevenue = async (storeId: string) => {
  const completedRequests = await prismadb.requestBalance.findMany({
    where: { status: "COMPLETED" },
    select: { amount: true },
  });

  const totalRevenue = completedRequests.reduce(
    (sum, request) => sum + (request.amount || 0),
    0
  );

  return totalRevenue;
};
