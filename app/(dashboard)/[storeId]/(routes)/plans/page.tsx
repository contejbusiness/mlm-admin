import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { PlanColumn } from "./components/columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.plan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: PlanColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    reward: formatter.format(Number(item.reward)),
    price: formatter.format(Number(item.price)),
    totalPurchased: item.totalPurchased,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
