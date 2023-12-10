import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (
  storeId: string
): Promise<GraphData[]> => {
  const completedRequests = await prismadb.requestBalance.findMany({
    where: {
      status: "COMPLETED",
    },
  });

  const dailyRevenue: { [key: number]: number } = {};

  // Grouping the requests by day and summing the revenue
  for (const request of completedRequests) {
    const day = new Date(request.createdAt).getDate(); // Day of the month (1 to 31)
    const revenueForRequest = request.amount || 0;

    // Adding the revenue for this request to the respective day
    dailyRevenue[day] = (dailyRevenue[day] || 0) + revenueForRequest;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = Array.from({ length: 31 }, (_, index) => ({
    name: (index + 1).toString(), // Day of the month (1 to 31)
    total: dailyRevenue[index + 1] || 0,
  }));

  return graphData;
};
