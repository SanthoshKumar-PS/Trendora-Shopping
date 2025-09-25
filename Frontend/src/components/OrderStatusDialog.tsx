import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { statusMap, type OrderStatus } from "../types/Types";

interface OrderStatusDialogProps {
    open : boolean;
    onClose : ()=>void;
    status : OrderStatus;
    message? : string;
}

export default function OrderStatusDialog({open,onClose,status,message}:OrderStatusDialogProps){
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center gap-2 text-lg font-semibold">
                        {statusMap[status].icon}
                        {statusMap[status].heading}
                    </DialogTitle>
                    <DialogDescription className="self-center">
                        {message??statusMap[status].message}
                    </DialogDescription>
                </DialogHeader>
    <div className="flex justify-center">
      <Button onClick={onClose} className={statusMap[status].style}>
        Ok
      </Button>
    </div>
            </DialogContent>
        </Dialog>
    )
}