import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function UpcomingClasses() {
    const classes = [
        {
            id: 1,
            title: "Web Development Fundamentals",
            date: "Today",
            time: "10:00 AM - 12:00 PM",
            location: "Room 101",
            status: "upcoming",
        },
        {
            id: 2,
            title: "JavaScript Advanced Concepts",
            date: "Tomorrow",
            time: "2:00 PM - 4:00 PM",
            location: "Room 203",
            status: "upcoming",
        },
        {
            id: 3,
            title: "Database Design Principles",
            date: "Wed, Apr 12",
            time: "9:00 AM - 11:00 AM",
            location: "Room 105",
            status: "upcoming",
        },
        {
            id: 4,
            title: "UI/UX Design Workshop",
            date: "Thu, Apr 13",
            time: "1:00 PM - 3:00 PM",
            location: "Design Lab",
            status: "upcoming",
        },
    ]

    return (
        <div className="space-y-3">
            {classes.map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="border-l-4 border-primary p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-semibold">{classItem.title}</h4>
                                <Badge variant="outline">{classItem.status}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    <span>{classItem.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{classItem.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>{classItem.location}</span>
                                </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Button size="sm" variant="outline">
                                    Check In
                                </Button>
                                <Button size="sm" variant="outline">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
