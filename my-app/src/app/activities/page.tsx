"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, MoreHorizontal, Search } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ActivitiesPage() {
    const [activeTab, setActiveTab] = useState("log")

    const activities = [
        {
            id: "1",
            title: "JavaScript Fundamentals Assignment",
            type: "Assignment",
            class: "Web Development Fundamentals",
            duration: "2.5 hours",
            date: "Apr 8, 2025",
            status: "Completed",
        },
        {
            id: "2",
            title: "Database Schema Design",
            type: "Project",
            class: "Database Design Principles",
            duration: "4 hours",
            date: "Apr 7, 2025",
            status: "In Progress",
        },
        {
            id: "3",
            title: "React Component Development",
            type: "Task",
            class: "JavaScript Advanced Concepts",
            duration: "3 hours",
            date: "Apr 6, 2025",
            status: "Completed",
        },
        {
            id: "4",
            title: "UI Wireframing",
            type: "Task",
            class: "UI/UX Design Workshop",
            duration: "1.5 hours",
            date: "Apr 5, 2025",
            status: "Completed",
        },
        {
            id: "5",
            title: "API Integration",
            type: "Project",
            class: "Web Development Fundamentals",
            duration: "2 hours",
            date: "Apr 4, 2025",
            status: "Completed",
        },
        {
            id: "6",
            title: "Mobile App Prototype",
            type: "Project",
            class: "Mobile App Development",
            duration: "5 hours",
            date: "Apr 3, 2025",
            status: "In Progress",
        },
    ]

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Activity Logging</h2>
            </div>

            <Tabs defaultValue="log" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="log">Log Activity</TabsTrigger>
                    <TabsTrigger value="history">Activity History</TabsTrigger>
                </TabsList>

                <TabsContent value="log" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Log New Activity</CardTitle>
                            <CardDescription>Record your time spent on tasks, assignments, and projects</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="activity-title">Activity Title</Label>
                                    <Input id="activity-title" placeholder="Enter activity title" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activity-type">Activity Type</Label>
                                    <Select>
                                        <SelectTrigger id="activity-type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="assignment">Assignment</SelectItem>
                                            <SelectItem value="project">Project</SelectItem>
                                            <SelectItem value="task">Task</SelectItem>
                                            <SelectItem value="study">Study</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="class">Related Class</Label>
                                    <Select>
                                        <SelectTrigger id="class">
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="web-dev">Web Development Fundamentals</SelectItem>
                                            <SelectItem value="js-advanced">JavaScript Advanced Concepts</SelectItem>
                                            <SelectItem value="database">Database Design Principles</SelectItem>
                                            <SelectItem value="ui-ux">UI/UX Design Workshop</SelectItem>
                                            <SelectItem value="mobile">Mobile App Development</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (hours)</Label>
                                    <Input id="duration" type="number" min="0.25" step="0.25" placeholder="Enter hours" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Describe what you worked on" rows={4} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Clear</Button>
                            <Button>Log Activity</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search activities..." className="w-full pl-8" />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Filter</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Type</DropdownMenuItem>
                                <DropdownMenuItem>Class</DropdownMenuItem>
                                <DropdownMenuItem>Status</DropdownMenuItem>
                                <DropdownMenuItem>Date</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Activity</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell className="font-medium">{activity.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{activity.type}</Badge>
                                        </TableCell>
                                        <TableCell>{activity.class}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                <span>{activity.duration}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{activity.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={activity.status === "Completed" ? "default" : "secondary"}>
                                                {activity.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Activity</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">Delete Activity</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
