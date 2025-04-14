import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from 'lucide-react';
import { format } from "date-fns";

interface AttendanceCardProps {
  date: string;
  checkInTime: string;
  checkOutTime?: string | null;
  duration?: number | null;
}

export function AttendanceCard({ date, checkInTime, checkOutTime, duration }: AttendanceCardProps) {
  const sessionDate = new Date(date);
  const checkIn = new Date(checkInTime);
  const checkOut = checkOutTime ? new Date(checkOutTime) : null;
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{format(sessionDate, "EEEE, MMMM d, yyyy")}</h3>
          <Badge variant={checkOut ? "default" : "outline"}>
            {checkOut ? "Completed" : "In Progress"}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            Check in: {format(checkIn, "h:mm a")}
            {checkOut && ` • Check out: ${format(checkOut, "h:mm a")}`}
          </span>
        </div>
        {duration && (
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>
              Duration: {Math.floor(duration / 60)} hours {duration % 60} minutes
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}