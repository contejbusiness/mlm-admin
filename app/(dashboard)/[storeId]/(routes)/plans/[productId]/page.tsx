import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const plan = await prismadb.plan.findUnique({
    where: {
      id:
        params.productId == "new"
          ? "aa9f0dd839e319425f6f8f2c"
          : params.productId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={plan} />
      </div>
    </div>
  );
};

export default ProductPage;
