import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  let color = null;

  try {
    color = await prismadb.color.findUnique({
      where: {
        id:
          params.colorId == "new" ? "aa9f0dd839e319425f6f8f2c" : params.colorId,
      },
    });
  } catch (error) {}
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
