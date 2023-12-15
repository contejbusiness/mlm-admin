import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { RedeemColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const redeems = await prismadb.redeem.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  const formattedSizes: RedeemColumn[] = redeems.map((item) => ({
    id: item.id,
    name: item.user.name,
    amount: item.amount,
    bank: item.bank,
    status: item.status,
    updatedAt: item.updatedAt,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
