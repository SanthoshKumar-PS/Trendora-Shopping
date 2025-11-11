// controllers/dashboardController.ts
import { PrismaClient } from "@prisma/client";
import { subDays, startOfDay, endOfDay, format } from "date-fns";


const prisma = new PrismaClient();

export const getLast7DaysSalesBySeller = async (req: any, res: any) => {
  try {
    const sellerId = Number(req.id);
    console.log("Seller Id: ",sellerId)
    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const sales = await prisma.orderDetails.groupBy({
      by: ["productId"],
      where: {
        order: {
          orderDate: {
            gte: lastWeek,
            lte: today,
          },
          status: {
            in: ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"],   
          },
        },
      },
      _sum: {
        quantity: true,
      },
    });

    if (sales.length === 0) {
      return res.status.json({
        range: `${lastWeek.toLocaleDateString("de-DE")} - ${today.toLocaleDateString("de-DE")}`,
        top5Products: [],
        totalProductsSold: 0,
      });
    }

    // Get product names for grouped IDs
    const productIds = sales.map((s) => s.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true },
    });

    // Merge sales data with product names
    const salesWithNames = sales.map((s) => {
      const product = products.find((p) => p.id === s.productId);
      return {
        productName: product?.name || "Unknown Product",
        count: s._sum.quantity ?? 0,
      };
    });

    // Sort & pick top 5
    const top5Products = salesWithNames
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Total quantity sold
    const totalProductsSold = salesWithNames.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return res.status(200).json({
      range: `${lastWeek.toLocaleDateString("de-DE")} - ${today.toLocaleDateString("de-DE")}`,
      top5Products,
      totalProductsSold,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return res.status(500).json({ message: "Error fetching sales data" });
  }
};

export const getRecentTransactions = async (req:any, res:any) => {
    try{
        const id = Number(req.id);
        const recentTransaction = await prisma.order.findMany({
            orderBy:{orderDate:'desc'},
            take:5,
            where:{
                orderDetails :{
                    some:{
                        product:{
                            isActive:true
                        }
                    }
                }

            },
            select:{
                id:true,
                orderNo:true,
                orderDate: true,
                totalAmount: true,
                user: {
                select: {
                    email: true,
                },
                },
                address: {
                select: {
                    name: true,
                },
                },
            }
        })
        
        return res.status(200).json({ message:"Fetched all recent transactions", transactions: recentTransaction })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Error while getting recent transactions."})
    }
}


export const getLast7DaysSales = async (req: any, res: any) => {
  try {
    const today = new Date();

    // Yesterday (exclude today from calculation)
    const yesterday = subDays(today, 1);

    // 7 days ago
    const sevenDaysAgo = subDays(yesterday, 6);

    // Group sales by day
    const sales = await prisma.order.groupBy({
      by: ["orderDate"],
      where: {
        orderDate: {
          gte: startOfDay(sevenDaysAgo),
          lte: endOfDay(yesterday),
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    // Build result for 7 days
    const result: { day: string; date: string; totalSales: number }[] = [];

    for (let i = 0; i < 7; i++) {
      const day = subDays(yesterday, 6 - i);
      const dateStr = format(day, "yyyy-MM-dd");
      const dayName = format(day, "EEEE"); // Monday, Tuesday, etc.

      const found = sales.find(
        (s) => format(s.orderDate, "yyyy-MM-dd") === dateStr
      );

      result.push({
        day: dayName,
        date: dateStr,
        totalSales: found?._sum.totalAmount ?? 0,
      });
    }

    return res.json({
      success: true,
      range: `${format(sevenDaysAgo, "yyyy-MM-dd")} to ${format(
        yesterday,
        "yyyy-MM-dd"
      )}`,
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
