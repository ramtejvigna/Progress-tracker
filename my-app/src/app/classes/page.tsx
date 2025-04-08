import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin, MoreHorizontal, Plus, Search, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ClassesPage() {
    const classes = [
        {
            id: "1",
            title: "Web Development Fundamentals",
            instructor: "Sarah Johnson",
            schedule: "Mon, Wed, Fri",
            time: "10:00 AM - 12:00 PM",
            location: "Room 101",
            students: 24,
            status: "Active",
        },
        {
            id: "2",
            title: "JavaScript Advanced Concepts",
            instructor: "David Lee",
            schedule: "Tue, Thu",
            time: "2:00 PM - 4:00 PM",
            location: "Room 203",
            students: 18,
            status: "Active",
        },
        {
            id: "3",
            title: "Database Design Principles",
            instructor: "Michael Brown",
            schedule: "Mon, Wed",
            time: "9:00 AM - 11:00 AM",
            location: "Room 105",
            students: 20,
            status: "Active",
        },
        {
            id: "4",
            title: "UI/UX Design Workshop",
            instructor: "Emily Wilson",
            schedule: "Fri",
            time: "1:00 PM - 5:00 PM",
            location: "Design Lab",
            students: 15,
            status: "Active",
        },
        {
            id: "5",
            title: "Mobile App Development",
            instructor: "Robert Martinez",
            schedule: "Tue, Thu",
            time: "10:00 AM - 12:00 PM",
            location: "Room 302",
            students: 22,
            status: "Inactive",
        },
        {
            id: "6",
            title: "Cloud Computing Essentials",
            instructor: "Jessica Taylor",
            schedule: "Wed",
            time: "2:00 PM - 5:00 PM",
            location: "Computer Lab",
            students: 16,
            status: "Active",
        },
    ]

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Class Tracking</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Class
                </Button>
            </div>
            <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search classes..." className="w-full pl-8" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filter</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Instructor</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                        <DropdownMenuItem>Schedule</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classItem) => (
                    <Card key={classItem.id}>
                        <CardContent className="p-0">
                            <div className={`border-l-4 ${classItem.status === "Active" ? "border-primary" : "border-muted"} p-4`}>
                                <div className="mb-2 flex items-center justify-between">
                                    <h4 className="font-semibold">{classItem.title}</h4>
                                    <Badge variant={classItem.status === "Active" ? "default" : "secondary"}>
                                        {classItem.status}
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>Instructor: {classItem.instructor}</p>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        <span>{classItem.schedule}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{classItem.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>{classItem.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3.5 w-3.5" />
                                        <span>{classItem.students} students</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <Button size="sm" variant="outline">
                                        Attendance
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        Details
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit Class</DropdownMenuItem>
                                            <DropdownMenuItem>View Students</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">Cancel Class</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
