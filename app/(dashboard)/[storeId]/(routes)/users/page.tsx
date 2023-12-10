import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { UserColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { plan: true, referrals: true, requests: true, redeems: true },
  });

  const formattedSizes: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    balance: item.balance,
    plan: item.plan == null ? "-" : item.plan.name,
    redeems: item.redeems.length,
    requests: item.requests.length,
    referrals: item.referrals.length,
    createdAt: new Date(String(item.createdAt)).toLocaleDateString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
