import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { RedeemColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  // const redeems = await prismadb.redeem.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   include: {
  //     user: true,
  //   },
  // });

  const redeems = [
    {
      id: "1",
      userId: "user1",
      amount: 100,
      bank: "Dummy Bank 1",
      status: "PENDING",
      createdAt: "2023-12-04T12:34:56.789Z",
      updatedAt: "2023-12-04T12:34:56.789Z",
      user: {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        balance: 500,
        redeems: [],
        requests: [],
      },
    },
    {
      id: "2",
      userId: "user2",
      amount: 120,
      bank: "Dummy Bank 2",
      status: "PENDING",
      createdAt: "2023-12-04T13:45:00.000Z",
      updatedAt: "2023-12-04T13:45:00.000Z",
      user: {
        id: "user2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+9876543210",
        balance: 600,
        redeems: [],
        requests: [],
      },
    },
    {
      id: "3",
      userId: "user3",
      amount: 150,
      bank: "Dummy Bank 3",
      status: "PENDING",
      createdAt: "2023-12-04T14:00:00.000Z",
      updatedAt: "2023-12-04T14:00:00.000Z",
      user: {
        id: "user3",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        phone: "+1122334455",
        balance: 700,
        redeems: [],
        requests: [],
      },
    },
    {
      id: "4",
      userId: "user4",
      amount: 80,
      bank: "Dummy Bank 4",
      status: "PENDING",
      createdAt: "2023-12-04T14:30:00.000Z",
      updatedAt: "2023-12-04T14:30:00.000Z",
      user: {
        id: "user4",
        name: "Alice Brown",
        email: "alice.brown@example.com",
        phone: "+9988776655",
        balance: 800,
        redeems: [],
        requests: [],
      },
    },
    {
      id: "5",
      userId: "user5",
      amount: 200,
      bank: "Dummy Bank 5",
      status: "PENDING",
      createdAt: "2023-12-04T15:00:00.000Z",
      updatedAt: "2023-12-04T15:00:00.000Z",
      user: {
        id: "user5",
        name: "Eva White",
        email: "eva.white@example.com",
        phone: "+1122338877",
        balance: 900,
        redeems: [],
        requests: [],
      },
    },
    {
      id: "10",
      userId: "user10",
      amount: 200,
      bank: "Dummy Bank 10",
      status: "PENDING",
      createdAt: "2023-12-04T15:00:00.000Z",
      updatedAt: "2023-12-04T15:00:00.000Z",
      user: {
        id: "user10",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1122334455",
        balance: 800,
        redeems: [],
        requests: [],
      },
    },
  ];

  const formattedSizes: RedeemColumn[] = redeems.map((item) => ({
    id: item.id,
    name: item.user.name,
    amount: item.amount,
    bank: item.bank,
    status: item.status,
    updatedAt: item.updatedAt,
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
    createdAt: item.createdAt,
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
