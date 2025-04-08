import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Users } from "lucide-react"
import { OverviewStats } from "@/components/overview-stats"
import { RecentActivities } from "@/components/recent-activities"
import { UpcomingClasses } from "@/components/upcoming-classes"
import { AttendanceChart } from "@/components/attendance-chart"

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Reports</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewStats />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your recent activities across all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your scheduled classes for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingClasses />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Your attendance rate over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AttendanceChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Productivity Metrics</CardTitle>
                <CardDescription>Your productivity metrics based on completed activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Task Completion</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Time Utilization</span>
                        <span className="text-sm text-muted-foreground">72%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "72%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Class Participation</span>
                        <span className="text-sm text-muted-foreground">93%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "93%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Report</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">Overall attendance rate</p>
                <Button variant="outline" className="mt-4 w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activity Completion</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Activities completed this month</p>
                <Button variant="outline" className="mt-4 w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Tracking</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.5h</div>
                <p className="text-xs text-muted-foreground">Total hours logged this month</p>
                <Button variant="outline" className="mt-4 w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
