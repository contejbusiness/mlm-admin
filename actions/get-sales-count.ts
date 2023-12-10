import prismadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const totalUsersCount: number = await prismadb.user.count();


  return totalUsersCount;
};
