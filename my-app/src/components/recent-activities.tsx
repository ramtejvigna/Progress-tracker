import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentActivities() {
    const activities = [
        {
            id: 1,
            user: {
                name: "John Doe",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "JD",
            },
            activity: "Completed task",
            description: "Finished the JavaScript fundamentals assignment",
            time: "2 hours ago",
            type: "task",
        },
        {
            id: 2,
            user: {
                name: "Sarah Johnson",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "SJ",
            },
            activity: "Attended class",
            description: "Web Development Basics - Session 4",
            time: "4 hours ago",
            type: "class",
        },
        {
            id: 3,
            user: {
                name: "Michael Brown",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "MB",
            },
            activity: "Submitted document",
            description: "Final project proposal document",
            time: "Yesterday",
            type: "document",
        },
        {
            id: 4,
            user: {
                name: "Emily Wilson",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "EW",
            },
            activity: "Logged hours",
            description: "4.5 hours on React component development",
            time: "Yesterday",
            type: "time",
        },
        {
            id: 5,
            user: {
                name: "David Lee",
                avatar: "/placeholder.svg?height=32&width=32",
                initials: "DL",
            },
            activity: "Missed class",
            description: "Database Design - Session 2",
            time: "2 days ago",
            type: "absence",
        },
    ]

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
                    <Avatar>
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                            <Badge variant={activity.type === "absence" ? "destructive" : "secondary"} className="text-xs">
                                {activity.type}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {activity.activity}: {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
