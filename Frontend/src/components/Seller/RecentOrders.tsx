import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";


const payments=[
      {
        id: 1,
        email: "santhoshkumarsakthi2003@gmail.com",
        userName: "Santhosh Kumar",
        userprofile:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
        price: 1400,
    },
      {
        id: 2,
        email: "santhoshkumarsakthi2003@gmail.com",
        userName: "Santhosh Kumar",
        userprofile:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
        price: 1400,
    }
]


const RecentOrders = () => {
    // const list = title === "Popular Content" ? popularContent : latestTransactions;


  return (
    <div className="">
        <h1 className="text-lg font-medium mb-2">Latest Transaction</h1>
        <div className="flex flex-col gap-2">
            {
                payments.map(item=>(
                    <Card key={item.id} className="flex-row items-center justify-between gap-4 p-3">
                        <img src={item.userprofile}  alt={item.email} className="w-12 h-12 rounded-sm overflow-hidden object-cover" />
                        <CardContent className='flex-1 p-0 truncate w-full'>
                            <CardTitle className='pb-1 text-xs'>{item.email}</CardTitle>
                            <Badge variant="secondary">{item.userName}</Badge>
                        </CardContent>

                        <CardFooter className="p-0 text-sm font-medium">
                            <Badge variant="outline">₹{item.price}</Badge>
                        </CardFooter>


                    </Card>
                ))
            }
        </div>
    </div>
  )
}

export default RecentOrders