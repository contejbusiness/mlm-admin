"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { PlanColumn, columns } from "./columns";
import { useEffect, useState } from "react";

type ButtonSize = "sm" | "lg";

interface ProductsClientProps {
  data: PlanColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [buttonSize, setButtonSize] = useState<ButtonSize>("sm");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setButtonSize("lg");
      } else {
        setButtonSize("sm");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Plans (${data.length})`}
          description="Manage your plans"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/plans/new`)}
          size={buttonSize}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Plans" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  );
};
