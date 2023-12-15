import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { RequestColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const requests = await prismadb.requestBalance.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  const formattedSizes: RequestColumn[] = requests.map((item) => ({
    id: item.id,
    name: item.user.name,
    amount: item.amount,
    status: item.status,
    imageUrl: item.imageUrl,

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
