import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ReferralColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({ params }: { params: { userId: string } }) => {
  const referrals = await prismadb.user.findUnique({
    where: { id: params.userId },
    include: {
      referrals: {
        select: {
          plan: true,
          name: true,
          balance: true,
          phone: true,
          id: true,
          createdAt: true,
        },
      },
    },
  });

  //@ts-ignore
  const formattedSizes: ReferralColumn[] = referrals?.referrals?.map(
    (item) => ({
      id: item.id,
      name: item.name,
      balance: item.balance,
      phone: item.phone,
      plan: item.plan == null ? "-" : item.plan.name,
      createdAt: new Date(item.createdAt).toLocaleDateString(),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
