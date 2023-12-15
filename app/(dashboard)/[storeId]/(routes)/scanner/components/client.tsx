"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, BillboardColumn } from "./columns";
import { useEffect, useState } from "react";

type ButtonSize = "sm" | "lg";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
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
          title={`QR Codes (${data.length})`}
          description="Manage QR Codes"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/scanner/new`)}
          size={buttonSize}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for QR" />
      <Separator />
      <ApiList entityName="Scanners" entityIdName="billboardId" /> */}
    </>
  );
};
