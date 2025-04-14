"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, Calendar, CheckCircle2, Clock, Download, Loader2, LogOut, Plus, RefreshCw, Users } from 'lucide-react';
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Types
interface Student {
  id: string;
  name: string;
  email: string;
  points: number;
  currentStreak: number;
  longestStreak: number;
  totalAttendances: number;
  totalDuration: number;
  averageDuration: number;
  last7DaysAttendance: number;
  badges: {
    id: string;
    name: string;
    earnedAt: string;
  }[];
}

interface LabSession {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  attendances: {
    id: string;
    userId: string;
    checkInTime: string;
    checkOutTime: string | null;
  }[];
}

interface Holiday {
  id: string;
  date: string;
  name: string;
  description: string | null;
}

interface AttendanceStats {
  monthly: {
    year: number;
    month: number;
    totalAttendance: number;
    sessionsCount: number;
    holidaysCount: number;
    averageAttendance: number;
  }[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [labSessions, setLabSessions] = useState<LabSession[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Form states
  const [newLabSession, setNewLabSession] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "16:30",
    endTime: "19:00",
  });
  const [newHoliday, setNewHoliday] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    name: "",
    description: "",
  });
  
  // Loading states
  const [refreshing, setRefreshing] = useState(false);
  const [addingLabSession, setAddingLabSession] = useState(false);
  const [addingHoliday, setAddingHoliday] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      // Fetch students
      const studentsResponse = await fetch("/api/admin/students");
      if (!studentsResponse.ok) {
        throw new Error("Failed to fetch students");
      }
      const studentsData = await studentsResponse.json();
      setStudents(studentsData.students);

      // Fetch lab sessions
      const sessionsResponse = await fetch("/api/lab-sessions");
      if (!sessionsResponse.ok) {
        throw new Error("Failed to fetch lab sessions");
      }
      const sessionsData = await sessionsResponse.json();
      setLabSessions(sessionsData.labSessions);

      // Fetch holidays
      const holidaysResponse = await fetch("/api/holidays");
      if (!holidaysResponse.ok) {
        throw new Error("Failed to fetch holidays");
      }
      const holidaysData = await holidaysResponse.json();
      setHolidays(holidaysData.holidays);

      // Fetch attendance stats
      const statsResponse = await fetch("/api/admin/attendance-stats?monthly=true");
      if (!statsResponse.ok) {
        throw new Error("Failed to fetch attendance stats");
      }
      const statsData = await statsResponse.json();
      setAttendanceStats(statsData.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAddLabSession = async () => {
    setAddingLabSession(true);
    try {
      const response = await fetch("/api/lab-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: newLabSession.date,
          startTime: `${newLabSession.date}T${newLabSession.startTime}:00`,
          endTime: `${newLabSession.date}T${newLabSession.endTime}:00`,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add lab session");
      }

      // Reset form and refresh data
      setNewLabSession({
        date: format(new Date(), "yyyy-MM-dd"),
        startTime: "16:30",
        endTime: "19:00",
      });
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while adding lab session");
    } finally {
      setAddingLabSession(false);
    }
  };

  const handleAddHoliday = async () => {
    setAddingHoliday(true);
    try {
      const response = await fetch("/api/holidays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: newHoliday.date,
          name: newHoliday.name,
          description: newHoliday.description || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add holiday");
      }

      // Reset form and refresh data
      setNewHoliday({
        date: format(new Date(), "yyyy-MM-dd"),
        name: "",
        description: "",
      });
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while adding holiday");
    } finally {
      setAddingHoliday(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      setError("Failed to log out");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={refreshing}>
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="ml-2">Refresh</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{students.length}</div>
              <p className="text-sm text-gray-500 mt-1">Total registered students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-500" />
                Lab Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{labSessions.length}</div>
              <p className="text-sm text-gray-500 mt-1">Total lab sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                Attendance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {attendanceStats && attendanceStats.monthly && attendanceStats.monthly.length > 0
                  ? `${Math.round(attendanceStats.monthly[attendanceStats.monthly.length - 1].averageAttendance)}%`
                  : "N/A"}
              </div>
              <p className="text-sm text-gray-500 mt-1">Average this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="lab-sessions">Lab Sessions</TabsTrigger>
            <TabsTrigger value="holidays">Holidays</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  View and manage student attendance and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Current Streak</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Badges</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.length > 0 ? (
                        students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.points}</TableCell>
                            <TableCell>{student.currentStreak} days</TableCell>
                            <TableCell>{student.totalAttendances} sessions</TableCell>
                            <TableCell>{student.badges.length}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            No students found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lab-sessions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Lab Sessions</CardTitle>
                  <CardDescription>
                    Manage lab sessions and view attendance
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Lab Session</DialogTitle>
                      <DialogDescription>
                        Create a new lab session for students to attend.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newLabSession.date}
                          onChange={(e) => setNewLabSession({ ...newLabSession, date: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={newLabSession.startTime}
                            onChange={(e) => setNewLabSession({ ...newLabSession, startTime: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={newLabSession.endTime}
                            onChange={(e) => setNewLabSession({ ...newLabSession, endTime: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddLabSession} disabled={addingLabSession}>
                        {addingLabSession ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Session"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {labSessions.length > 0 ? (
                        labSessions.map((session) => {
                          const sessionDate = new Date(session.date);
                          const startTime = new Date(session.startTime);
                          const endTime = new Date(session.endTime);
                          
                          return (
                            <TableRow key={session.id}>
                              <TableCell className="font-medium">
                                {format(sessionDate, "EEEE, MMMM d, yyyy")}
                              </TableCell>
                              <TableCell>
                                {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
                              </TableCell>
                              <TableCell>
                                {session.isActive ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Inactive
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                {session.attendances.length} students
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">
                            No lab sessions found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="holidays">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Holidays</CardTitle>
                  <CardDescription>
                    Manage holidays to prevent streak breaking
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Holiday
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Holiday</DialogTitle>
                      <DialogDescription>
                        Add a holiday to prevent student streaks from breaking.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="holidayDate">Date</Label>
                        <Input
                          id="holidayDate"
                          type="date"
                          value={newHoliday.date}
                          onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="holidayName">Holiday Name</Label>
                        <Input
                          id="holidayName"
                          type="text"
                          placeholder="e.g., Independence Day"
                          value={newHoliday.name}
                          onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="holidayDescription">Description (Optional)</Label>
                        <Input
                          id="holidayDescription"
                          type="text"
                          placeholder="Brief description of the holiday"
                          value={newHoliday.description}
                          onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddHoliday} disabled={addingHoliday || !newHoliday.name}>
                        {addingHoliday ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Holiday"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Holiday Name</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {holidays.length > 0 ? (
                        holidays.map((holiday) => {
                          const holidayDate = new Date(holiday.date);
                          
                          return (
                            <TableRow key={holiday.id}>
                              <TableCell className="font-medium">
                                {format(holidayDate, "EEEE, MMMM d, yyyy")}
                              </TableCell>
                              <TableCell>{holiday.name}</TableCell>
                              <TableCell>{holiday.description || "-"}</TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4">
                            No holidays found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}