import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import type { TransactionType } from "../../types/ResponseTypes";
import { formatCurrency } from "../../lib/formatCurrency";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type RecentOrdersProps = {
  latestTransactions: TransactionType[];
  setLatestTransactions: React.Dispatch<
    React.SetStateAction<TransactionType[]>
  >;
};
const RecentOrders = ({
  latestTransactions,
  setLatestTransactions,
}: RecentOrdersProps) => {
  // const list = title === "Popular Content" ? popularContent : latestTransactions;
  console.log("LatestTransactions: ", latestTransactions);
  const navigate = useNavigate();

  return (
    <motion.div
      className=""
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 50,
        damping: 10,
      }}
    >
      <h1 className="text-lg font-medium mb-2">Latest Transaction</h1>
      <div className="flex flex-col gap-2">
        {latestTransactions.map((item) => (
          <Card
            key={item.id}
            onClick={() => {
              navigate(`/order/${item.orderNo}`);
            }}
            className="flex-row items-center justify-between gap-4 p-3 hover:cursor-pointer"
          >
            {/* <img src={item.userprofile}  alt={item.email} className="w-12 h-12 rounded-sm overflow-hidden object-cover" /> */}
            <CardContent className="flex-1 p-0 truncate w-full">
              <CardTitle className="pb-1 text-xs">{item.user.email}</CardTitle>
              <Badge variant="secondary">{item.address.name}</Badge>
            </CardContent>

            <CardFooter className="p-0 text-sm font-medium">
              <Badge variant="outline">
                {formatCurrency(item.totalAmount)}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentOrders;
