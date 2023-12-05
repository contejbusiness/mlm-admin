import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { UserColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    balance: item.balance,
    createdAt: String(item.createdAt),
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
