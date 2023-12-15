import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/size-form";

const SizePage = async ({ params }: { params: { userId: string } }) => {
  const size = await prismadb.user.findUnique({
    where: {
      id: params.userId == "new" ? "aa9f0dd839e319425f6f8f2c" : params.userId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
