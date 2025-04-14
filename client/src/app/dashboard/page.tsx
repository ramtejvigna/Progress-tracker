"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, CheckCircle2, Clock, FlameIcon as Fire, Loader2, LogOut, Medal, Star, Trophy, User } from 'lucide-react';
import { format } from "date-fns";

// Types
interface UserStats {
  id: string;
  name: string;
  email: string;
  points: number;
  currentStreak: number;
  longestStreak: number;
  userBadges: {
    badge: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
    };
    earnedAt: string;
  }[];
  attendances: {
    id: string;
    checkInTime: string;
    checkOutTime: string | null;
    duration: number | null;
    labSession: {
      date: string;
      startTime: string;
      endTime: string;
    };
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

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  points: number;
  currentStreak: number;
  badgeCount: number;
  topBadge: {
    id: string;
    name: string;
    imageUrl: string;
  } | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [activeSessions, setActiveSessions] = useState<LabSession[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [checkOutLoading, setCheckOutLoading] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user stats
        const statsResponse = await fetch("/api/user/stats");
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch user stats");
        }
        const statsData = await statsResponse.json();
        setUserStats(statsData.stats);

        // Fetch active lab sessions
        const sessionsResponse = await fetch("/api/lab-sessions?future=true");
        if (!sessionsResponse.ok) {
          throw new Error("Failed to fetch lab sessions");
        }
        const sessionsData = await sessionsResponse.json();
        
        // Filter for today's active sessions
        const today = new Date().toISOString().split("T")[0];
        const todaySessions = sessionsData.labSessions.filter(
          (session: LabSession) => new Date(session.date).toISOString().split("T")[0] === today && session.isActive
        );
        setActiveSessions(todaySessions);

        // Check if user is already checked in to any session
        if (statsData.stats.attendances.length > 0) {
          const latestAttendance = statsData.stats.attendances[0];
          if (latestAttendance.checkInTime && !latestAttendance.checkOutTime) {
            setActiveSessionId(latestAttendance.labSession.id);
          }
        }

        // Fetch leaderboard
        const leaderboardResponse = await fetch("/api/leaderboard?limit=5");
        if (!leaderboardResponse.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const leaderboardData = await leaderboardResponse.json();
        setLeaderboard(leaderboardData.leaderboard);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckIn = async (sessionId: string) => {
    setCheckInLoading(true);
    try {
      const response = await fetch("/api/attendance/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ labSessionId: sessionId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to check in");
      }

      // Update UI
      setActiveSessionId(sessionId);
      
      // Refresh user stats
      const statsResponse = await fetch("/api/user/stats");
      const statsData = await statsResponse.json();
      setUserStats(statsData.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during check-in");
    } finally {
      setCheckInLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!activeSessionId) return;
    
    setCheckOutLoading(true);
    try {
      const response = await fetch("/api/attendance/check-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ labSessionId: activeSessionId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to check out");
      }

      // Update UI
      setActiveSessionId(null);
      
      // Refresh user stats
      const statsResponse = await fetch("/api/user/stats");
      const statsData = await statsResponse.json();
      setUserStats(statsData.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during check-out");
    } finally {
      setCheckOutLoading(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {userStats?.name}
            </div>
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
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userStats?.points || 0}</div>
              <p className="text-sm text-gray-500 mt-1">Total points earned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Fire className="h-5 w-5 mr-2 text-orange-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userStats?.currentStreak || 0} days</div>
              <p className="text-sm text-gray-500 mt-1">Longest: {userStats?.longestStreak || 0} days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Medal className="h-5 w-5 mr-2 text-purple-500" />
                Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userStats?.userBadges?.length || 0}</div>
              <p className="text-sm text-gray-500 mt-1">Earned badges</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="today">Today's Lab</TabsTrigger>
                <TabsTrigger value="history">Attendance History</TabsTrigger>
                <TabsTrigger value="badges">My Badges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Lab Session</CardTitle>
                    <CardDescription>
                      {format(new Date(), "EEEE, MMMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeSessions.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium">No lab session today</h3>
                        <p className="text-gray-500 mt-2">
                          There are no active lab sessions scheduled for today.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {activeSessions.map((session) => {
                          const isCheckedIn = session.id === activeSessionId;
                          const startTime = new Date(session.startTime);
                          const endTime = new Date(session.endTime);
                          
                          return (
                            <div key={session.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-medium">Lab Session</h3>
                                  <div className="text-sm text-gray-500 flex items-center mt-1">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
                                  </div>
                                </div>
                                <Badge variant={isCheckedIn ? "default" : "outline"}>
                                  {isCheckedIn ? "Checked In" : "Not Checked In"}
                                </Badge>
                              </div>
                              
                              {isCheckedIn ? (
                                <Button 
                                  onClick={handleCheckOut} 
                                  className="w-full bg-red-500 hover:bg-red-600"
                                  disabled={checkOutLoading}
                                >
                                  {checkOutLoading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Checking out...
                                    </>
                                  ) : (
                                    "Check Out"
                                  )}
                                </Button>
                              ) : (
                                <Button 
                                  onClick={() => handleCheckIn(session.id)} 
                                  className="w-full"
                                  disabled={checkInLoading}
                                >
                                  {checkInLoading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Checking in...
                                    </>
                                  ) : (
                                    "Check In"
                                  )}
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance History</CardTitle>
                    <CardDescription>
                      Your recent lab attendance records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userStats?.attendances && userStats.attendances.length > 0 ? (
                      <div className="space-y-4">
                        {userStats.attendances.map((attendance) => {
                          const checkInTime = new Date(attendance.checkInTime);
                          const checkOutTime = attendance.checkOutTime ? new Date(attendance.checkOutTime) : null;
                          const sessionDate = new Date(attendance.labSession.date);
                          
                          return (
                            <div key={attendance.id} className="flex items-center border-b pb-4">
                              <div className="bg-primary/10 p-3 rounded-full mr-4">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">
                                  {format(sessionDate, "EEEE, MMMM d, yyyy")}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Check in: {format(checkInTime, "h:mm a")}
                                  {checkOutTime && ` • Check out: ${format(checkOutTime, "h:mm a")}`}
                                </div>
                                {attendance.duration && (
                                  <div className="text-sm text-gray-500">
                                    Duration: {Math.floor(attendance.duration / 60)} hours {attendance.duration % 60} minutes
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium">No attendance records</h3>
                        <p className="text-gray-500 mt-2">
                          You haven't attended any lab sessions yet.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="badges">
                <Card>
                  <CardHeader>
                    <CardTitle>My Badges</CardTitle>
                    <CardDescription>
                      Badges you've earned through your lab attendance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userStats?.userBadges && userStats.userBadges.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {userStats.userBadges.map((userBadge) => (
                          <div key={userBadge.badge.id} className="border rounded-lg p-4 flex items-center">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              <Trophy className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{userBadge.badge.name}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                {userBadge.badge.description}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                Earned on {format(new Date(userBadge.earnedAt), "MMMM d, yyyy")}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Medal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium">No badges yet</h3>
                        <p className="text-gray-500 mt-2">
                          Keep attending lab sessions to earn badges!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers in the lab
                </CardDescription>
              </CardHeader>
              <CardContent>
                {leaderboard.length > 0 ? (
                  <div className="space-y-4">
                    {leaderboard.map((entry) => (
                      <div key={entry.id} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-bold text-primary">
                          {entry.rank}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium flex items-center">
                            <User className="h-4 w-4 mr-1 text-gray-400" />
                            {entry.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {entry.points} points • {entry.currentStreak} day streak
                          </div>
                        </div>
                        <div className="text-lg font-bold">
                          {entry.badgeCount}
                          <span className="text-xs text-gray-500 ml-1">badges</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}