"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserColumn } from "./columns";
import { RewardModal } from "@/components/modals/reward-model";

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/redeems/${data.id}`);
      toast.success("Redeem request deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete redeem request.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onReward = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/${params.storeId}/user/${data.id}`);
      toast.success("Reward Sent.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to send reward.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Size ID copied to clipboard.");
  };

  return (
    <>
      <RewardModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onReward}
        loading={loading}
      />

      {/* <BalanceModal /> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/referrals/${data.id}`)
            }
          >
            <Check className="mr-2 h-4 w-4" /> View Referrals
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Add Balance
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
