import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const totalPlanCount: number = await prismadb.plan.count();

  return totalPlanCount;
};
