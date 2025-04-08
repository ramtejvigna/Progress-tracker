import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BarChart, CalendarDays, Download, FileText, PieChart, Users } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
            </div>

            <Tabs defaultValue="attendance" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="custom">Custom Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="attendance" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">89%</div>
                                <p className="text-xs text-muted-foreground">Average attendance rate across all classes</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Class Attendance</CardTitle>
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">24 Classes</div>
                                <p className="text-xs text-muted-foreground">Total active classes being tracked</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Attendance Trends</CardTitle>
                                <BarChart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+4.3%</div>
                                <p className="text-xs text-muted-foreground">Improvement in attendance over last month</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Report Generator</CardTitle>
                            <CardDescription>
                                Generate detailed attendance reports for specific classes and date ranges
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="class-select">Select Class</Label>
                                    <Select>
                                        <SelectTrigger id="class-select">
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Classes</SelectItem>
                                            <SelectItem value="web-dev">Web Development Fundamentals</SelectItem>
                                            <SelectItem value="js-advanced">JavaScript Advanced Concepts</SelectItem>
                                            <SelectItem value="database">Database Design Principles</SelectItem>
                                            <SelectItem value="ui-ux">UI/UX Design Workshop</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date-range">Date Range</Label>
                                    <Select>
                                        <SelectTrigger id="date-range">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="last-week">Last Week</SelectItem>
                                            <SelectItem value="last-month">Last Month</SelectItem>
                                            <SelectItem value="last-quarter">Last Quarter</SelectItem>
                                            <SelectItem value="custom">Custom Range</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="report-format">Report Format</Label>
                                    <Select>
                                        <SelectTrigger id="report-format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="activities" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">573</div>
                                <p className="text-xs text-muted-foreground">Activities logged in the system</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Activity Distribution</CardTitle>
                                <PieChart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4 Types</div>
                                <p className="text-xs text-muted-foreground">Distribution across activity types</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                                <BarChart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">85%</div>
                                <p className="text-xs text-muted-foreground">Activities marked as completed</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Report Generator</CardTitle>
                            <CardDescription>Generate detailed reports on activities and time tracking</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="activity-type">Activity Type</Label>
                                    <Select>
                                        <SelectTrigger id="activity-type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Types</SelectItem>
                                            <SelectItem value="assignment">Assignments</SelectItem>
                                            <SelectItem value="project">Projects</SelectItem>
                                            <SelectItem value="task">Tasks</SelectItem>
                                            <SelectItem value="study">Study</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activity-date-range">Date Range</Label>
                                    <Select>
                                        <SelectTrigger id="activity-date-range">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="last-week">Last Week</SelectItem>
                                            <SelectItem value="last-month">Last Month</SelectItem>
                                            <SelectItem value="last-quarter">Last Quarter</SelectItem>
                                            <SelectItem value="custom">Custom Range</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activity-report-format">Report Format</Label>
                                    <Select>
                                        <SelectTrigger id="activity-report-format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Dashboard</CardTitle>
                            <CardDescription>View and analyze performance metrics across users and classes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Overall Productivity</h4>
                                        <span className="text-sm text-muted-foreground">78%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }}></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Assignment Completion Rate</h4>
                                        <span className="text-sm text-muted-foreground">92%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div className="h-2 rounded-full bg-primary" style={{ width: "92%" }}></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Class Participation</h4>
                                        <span className="text-sm text-muted-foreground">85%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Time Utilization</h4>
                                        <span className="text-sm text-muted-foreground">72%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div className="h-2 rounded-full bg-primary" style={{ width: "72%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Export Dashboard
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Report Generator</CardTitle>
                            <CardDescription>Generate detailed performance reports for users and classes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="performance-user">Select User</Label>
                                    <Select>
                                        <SelectTrigger id="performance-user">
                                            <SelectValue placeholder="Select user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Users</SelectItem>
                                            <SelectItem value="john">John Doe</SelectItem>
                                            <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                            <SelectItem value="michael">Michael Brown</SelectItem>
                                            <SelectItem value="emily">Emily Wilson</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="performance-metric">Performance Metric</Label>
                                    <Select>
                                        <SelectTrigger id="performance-metric">
                                            <SelectValue placeholder="Select metric" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Metrics</SelectItem>
                                            <SelectItem value="attendance">Attendance</SelectItem>
                                            <SelectItem value="completion">Task Completion</SelectItem>
                                            <SelectItem value="participation">Participation</SelectItem>
                                            <SelectItem value="time">Time Utilization</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="performance-format">Report Format</Label>
                                    <Select>
                                        <SelectTrigger id="performance-format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Report Builder</CardTitle>
                            <CardDescription>Build custom reports with the metrics and data you need</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="report-title">Report Title</Label>
                                    <input
                                        id="report-title"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter report title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="report-description">Report Description</Label>
                                    <input
                                        id="report-description"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter report description"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Select Data Sources</Label>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="users-data"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="users-data" className="text-sm font-normal">
                                            User Data
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="classes-data"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="classes-data" className="text-sm font-normal">
                                            Class Data
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="attendance-data"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="attendance-data" className="text-sm font-normal">
                                            Attendance Data
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="activities-data"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="activities-data" className="text-sm font-normal">
                                            Activities Data
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="performance-data"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="performance-data" className="text-sm font-normal">
                                            Performance Data
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Report Format</Label>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="pdf-format"
                                            name="format"
                                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="pdf-format" className="text-sm font-normal">
                                            PDF
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="excel-format"
                                            name="format"
                                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="excel-format" className="text-sm font-normal">
                                            Excel
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="csv-format"
                                            name="format"
                                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="csv-format" className="text-sm font-normal">
                                            CSV
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="json-format"
                                            name="format"
                                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="json-format" className="text-sm font-normal">
                                            JSON
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Save Template</Button>
                            <Button>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Custom Report
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
