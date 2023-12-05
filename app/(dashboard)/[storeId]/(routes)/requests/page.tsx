import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { RequestColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  // const redeems = await prismadb.requestBalance.findMany({
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
      amount: 75,
      imageUrl: "https://example.com/image1.jpg",
      status: "PENDING",
      createdAt: "2023-12-05T10:00:00.000Z",
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
      imageUrl: "https://example.com/image2.jpg",
      status: "PENDING",
      createdAt: "2023-12-05T10:30:00.000Z",
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
      amount: 90,
      imageUrl: "https://example.com/image3.jpg",
      status: "PENDING",
      createdAt: "2023-12-05T11:00:00.000Z",
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
      amount: 60,
      imageUrl: "https://example.com/image4.jpg",
      status: "PENDING",
      createdAt: "2023-12-05T11:30:00.000Z",
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
  ];

  const formattedSizes: RequestColumn[] = redeems.map((item) => ({
    id: item.id,
    name: item.user.name,
    amount: item.amount,
    status: item.status,
    imageUrl: item.imageUrl,
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
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
