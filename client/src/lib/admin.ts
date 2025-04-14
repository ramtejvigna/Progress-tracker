import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStudentStats() {
  // Get all students with their stats
  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      isVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      points: true,
      currentStreak: true,
      longestStreak: true,
      attendances: {
        select: {
          id: true,
          checkInTime: true,
          checkOutTime: true,
          duration: true,
          labSession: {
            select: {
              date: true,
            },
          },
        },
      },
      userBadges: {
        include: {
          badge: true,
        },
      },
    },
    orderBy: {
      points: 'desc',
    },
  });

  // Calculate additional stats for each student
  const studentsWithStats = students.map((student: { attendances: any[]; id: any; name: any; email: any; points: any; currentStreak: any; longestStreak: any; userBadges: any[]; }) => {
    const totalAttendances = student.attendances.length;
    const totalDuration = student.attendances.reduce((sum: any, attendance: { duration: any; }) => {
      return sum + (attendance.duration || 0);
    }, 0);
    const averageDuration = totalAttendances > 0 ? totalDuration / totalAttendances : 0;

    // Get last 7 days attendance
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const last7DaysAttendance = student.attendances.filter((attendance: { labSession: { date: string | number | Date; }; }) => {
      const attendanceDate = new Date(attendance.labSession.date);
      return attendanceDate >= sevenDaysAgo && attendanceDate <= now;
    });

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      points: student.points,
      currentStreak: student.currentStreak,
      longestStreak: student.longestStreak,
      totalAttendances,
      totalDuration,
      averageDuration,
      last7DaysAttendance: last7DaysAttendance.length,
      badges: student.userBadges.map((ub: { badge: { id: any; name: any; }; earnedAt: any; }) => ({
        id: ub.badge.id,
        name: ub.badge.name,
        earnedAt: ub.earnedAt,
      })),
    };
  });

  return studentsWithStats;
}

export async function getAttendanceStats(options: { daily?: boolean; weekly?: boolean; monthly?: boolean } = {}) {
  const { daily = false, weekly = false, monthly = true } = options;
  
  // Get all lab sessions with attendance
  const labSessions = await prisma.labSession.findMany({
    include: {
      attendances: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  // Get all holidays
  const holidays = await prisma.holiday.findMany({
    orderBy: {
      date: 'asc',
    },
  });

  // Calculate stats based on the requested time period
  if (daily) {
    // Group by day
    const dailyStats = labSessions.map((session: {
        attendances: any; date: string | number | Date; 
}) => {
      const date = new Date(session.date);
      const dateString = date.toISOString().split('T')[0];
      const isHoliday = holidays.some((holiday: { date: string | number | Date; }) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.toISOString().split('T')[0] === dateString;
      });
      
      return {
        date: dateString,
        attendanceCount: session.attendances.length,
        isHoliday,
        holidayName: isHoliday ? holidays.find((h: { date: string | number | Date; }) => new Date(h.date).toISOString().split('T')[0] === dateString)?.name : null,
      };
    });

    return { daily: dailyStats };
  }

  if (weekly) {
    // Group by week
    const weeklyStats = [];
    let currentWeekStart = new Date(labSessions[0]?.date || new Date());
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Set to Sunday
    
    let currentWeekSessions: any[] = [];
    
    for (const session of labSessions) {
      const sessionDate = new Date(session.date);
      const weekStart = new Date(sessionDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Set to Sunday
      
      if (weekStart.getTime() !== currentWeekStart.getTime()) {
        // New week, push the current week's data
        if (currentWeekSessions.length > 0) {
          const totalAttendance = currentWeekSessions.reduce((sum, s) => sum + s.attendances.length, 0);
          const weekHolidays = holidays.filter((holiday: { date: string | number | Date; }) => {
            const holidayDate = new Date(holiday.date);
            const holidayWeekStart = new Date(holidayDate);
            holidayWeekStart.setDate(holidayWeekStart.getDate() - holidayWeekStart.getDay());
            return holidayWeekStart.getTime() === currentWeekStart.getTime();
          });
          
          weeklyStats.push({
            weekStart: currentWeekStart.toISOString().split('T')[0],
            weekEnd: new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            totalAttendance,
            sessionsCount: currentWeekSessions.length,
            holidaysCount: weekHolidays.length,
          });
        }
        
        // Start a new week
        currentWeekStart = weekStart;
        currentWeekSessions = [session];
      } else {
        currentWeekSessions.push(session);
      }
    }
    
    // Don't forget the last week
    if (currentWeekSessions.length > 0) {
      const totalAttendance = currentWeekSessions.reduce((sum, s) => sum + s.attendances.length, 0);
      const weekHolidays = holidays.filter((holiday: { date: string | number | Date; }) => {
        const holidayDate = new Date(holiday.date);
        const holidayWeekStart = new Date(holidayDate);
        holidayWeekStart.setDate(holidayWeekStart.getDate() - holidayWeekStart.getDay());
        return holidayWeekStart.getTime() === currentWeekStart.getTime();
      });
      
      weeklyStats.push({
        weekStart: currentWeekStart.toISOString().split('T')[0],
        weekEnd: new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        totalAttendance,
        sessionsCount: currentWeekSessions.length,
        holidaysCount: weekHolidays.length,
      });
    }
    
    return { weekly: weeklyStats };
  }

  if (monthly) {
    // Group by month
    const monthlyStats = [];
    let currentMonth = -1;
    let currentYear = -1;
    let currentMonthSessions: any[] = [];
    
    for (const session of labSessions) {
      const sessionDate = new Date(session.date);
      const month = sessionDate.getMonth();
      const year = sessionDate.getFullYear();
      
      if (month !== currentMonth || year !== currentYear) {
        // New month, push the current month's data
        if (currentMonthSessions.length > 0) {
          const totalAttendance = currentMonthSessions.reduce((sum, s) => sum + s.attendances.length, 0);
          const monthHolidays = holidays.filter((holiday: { date: string | number | Date; }) => {
            const holidayDate = new Date(holiday.date);
            return holidayDate.getMonth() === currentMonth && holidayDate.getFullYear() === currentYear;
          });
          
          monthlyStats.push({
            year: currentYear,
            month: currentMonth + 1, // 1-12 instead of 0-11
            totalAttendance,
            sessionsCount: currentMonthSessions.length,
            holidaysCount: monthHolidays.length,
            averageAttendance: totalAttendance / currentMonthSessions.length,
          });
        }
        
        // Start a new month
        currentMonth = month;
        currentYear = year;
        currentMonthSessions = [session];
      } else {
        currentMonthSessions.push(session);
      }
    }
    
    // Don't forget the last month
    if (currentMonthSessions.length > 0) {
      const totalAttendance = currentMonthSessions.reduce((sum, s) => sum + s.attendances.length, 0);
      const monthHolidays = holidays.filter((holiday: { date: string | number | Date; }) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.getMonth() === currentMonth && holidayDate.getFullYear() === currentYear;
      });
      
      monthlyStats.push({
        year: currentYear,
        month: currentMonth + 1, // 1-12 instead of 0-11
        totalAttendance,
        sessionsCount: currentMonthSessions.length,
        holidaysCount: monthHolidays.length,
        averageAttendance: totalAttendance / currentMonthSessions.length,
      });
    }
    
    return { monthly: monthlyStats };
  }

  // Default: return all stats
  return {
    totalSessions: labSessions.length,
    totalAttendances: labSessions.reduce((sum: any, session: { attendances: string | any[]; }) => sum + session.attendances.length, 0),
    totalHolidays: holidays.length,
  };
}

export async function getLeaderboard(limit = 10) {
  // Get top students by points
  const topStudents = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      isVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      points: true,
      currentStreak: true,
      longestStreak: true,
      userBadges: {
        include: {
          badge: true,
        },
      },
    },
    orderBy: {
      points: 'desc',
    },
    take: limit,
  });

  return topStudents.map((student: { id: any; name: any; points: any; currentStreak: any; userBadges: any[]; }, index: number) => ({
    rank: index + 1,
    id: student.id,
    name: student.name,
    points: student.points,
    currentStreak: student.currentStreak,
    badgeCount: student.userBadges.length,
    topBadge: student.userBadges.length > 0 
      ? student.userBadges.reduce((highest: { badge: { pointsRequired: number; }; }, current: { badge: { pointsRequired: number; }; }) => 
          current.badge.pointsRequired > highest.badge.pointsRequired ? current : highest
        ).badge
      : null,
  }));
}